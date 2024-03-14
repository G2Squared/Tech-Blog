const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
   
    try {
        // Get all Blog posts and also User names
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'], // just want the name
                },
            ],
        });

        // Serialize data so template can read it
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        // send that data to the template
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err){
        res.json(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
      const blogData = await Blog.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const blog = blogData.get({ plain: true });

      const commentData = await Comment.findAll({ // Get commentes
        where: { // WHERE blog_id == blog.id (from the first model)
          blog_id: blog.id
        },
        include: [{ // Include user associated with that comment
          model: User,
          attributes: ['name'],
         }],
        
      });
  
      const comments = commentData.map((comment) => comment.get({ plain: true}));

      res.render('blog', {
        ...blog,
        comments,
        logged_in: req.session.logged_in,
        logged_in_userId: req.session.user_id
      });
    } catch (err) {
      res.status(500).json(err);
    }
});


router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, { // find user logged in
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) { // if we are logged in, send user to dashboard
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});


module.exports = router;