const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => { // POST route to create a blog
    try {
      const newBlog = await Blog.create({ // Create it
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newBlog);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.put('/update', withAuth, async (req, res) => { // POST route to update a blog

  try {
    const updatedData = JSON.parse(JSON.stringify(req.body)); // Parse the data from the request body

    console.log("#################    " + updatedData.blogObject.contents + "   ID:     " + updatedData.blogObject.blogId);

    const updateBlog = await Blog.update(// Update it
      { contents: updatedData.blogObject.contents, title: updatedData.blogObject.blogTitle},
      {
        where: { // Where id is equal to the blog id
          id: updatedData.blogObject.blogId, // Note when I sent out POST request it was called 'blogObject'
        },
      }
    );

    res.status(200).json(updateBlog);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.post('/comments', withAuth, async (req, res) => { // POST route to create a comment
  try {     
    const data = JSON.parse(JSON.stringify(req.body)); // Parse the data from the request body
   
    const newComment = await Comment.create({ // Create the comment with the data
      contents: data.bodyObject.contents, // Note when I sent out POST request it was called 'bodyObject'
      blog_id: data.bodyObject.blogId,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
    
  } catch (err) {
    res.status(400).json(err);
  }

});

router.delete('/:id', withAuth, async (req, res) => { // DELETE route to delete a blog
    try {
      const blogData = await Blog.destroy({ // Destroy (delete) it
        where: {
          id: req.params.id,
          user_id: req.session.user_id, // user id should be in session
        },
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;