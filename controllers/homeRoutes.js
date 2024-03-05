const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route to fetch all blog posts for the homepage
router.get('/', async (req, res) => {
    try {
        // Fetch all blog posts including the associated user names
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'], // Retrieve only the user's name
                },
            ],
        });

        // Serialize the data for the template to read
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        // Send the data to the homepage template
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err){
        // Handle server error if fetching data fails
        res.status(500).json(err);
    }
});

// Route to fetch a specific blog post and its associated comments
router.get('/blog/:id', async (req, res) => {
    try {
        // Fetch the specified blog post and include the associated user's name
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const blog = blogData.get({ plain: true });

        // Fetch comments associated with the specified blog post
        const commentData = await Comment.findAll({
            where: {
                blog_id: blog.id
            },
            include: [{
                model: User,
                attributes: ['name'],
            }],
        });

        const comments = commentData.map((comment) => comment.get({ plain: true }));

        // Render the blog page template with the retrieved data
        res.render('blog', {
            ...blog,
            comments,
            logged_in: req.session.logged_in,
            logged_in_userId: req.session.user_id
        });
    } catch (err) {
        // Handle server error if fetching data fails
        res.status(500).json(err);
    }
});

// Route to render the user dashboard after authentication
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Fetch the logged-in user's data excluding the password and including their blogs
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });

        const user = userData.get({ plain: true });

        // Render the dashboard template with the user's data
        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        // Handle server error if fetching data fails
        res.status(500).json(err);
    }
});

// Route to render the login page
router.get('/login', (req, res) => {
    // Redirect to the dashboard if the user is already logged in
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    // Render the login page
    res.render('login');
});

module.exports = router;
