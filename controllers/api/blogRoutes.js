const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new blog post
router.post('/', withAuth, async (req, res) => {
    try {
        // Create a new blog post with the data from the request body
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id, // Assign the current user's ID to the blog post
        });

        res.status(200).json(newBlog); // Send back the newly created blog post
    } catch (err) {
        res.status(400).json(err); // Send a Bad Request status if there's an error
    }
});

// Route to update an existing blog post
router.put('/update', withAuth, async (req, res) => {
    try {
        // Parse the data from the request body
        const updatedData = JSON.parse(JSON.stringify(req.body));

        // Update the specified blog post with the new contents and title
        const updateBlog = await Blog.update(
            { contents: updatedData.blogObject.contents, title: updatedData.blogObject.blogTitle },
            {
                where: {
                    id: updatedData.blogObject.blogId, // Find the blog post by its ID
                },
            }
        );

        res.status(200).json(updateBlog); // Send back a success status with the updated blog post
    } catch (err) {
        res.status(400).json(err); // Send a Bad Request status if there's an error
    }
});

// Route to create a new comment on a blog post
router.post('/comments', withAuth, async (req, res) => {
    try {
        // Parse the data from the request body
        const data = JSON.parse(JSON.stringify(req.body));

        // Create a new comment with the provided data
        const newComment = await Comment.create({
            contents: data.bodyObject.contents,
            blog_id: data.bodyObject.blogId,
            user_id: req.session.user_id, // Assign the current user's ID to the comment
        });

        res.status(200).json(newComment); // Send back the newly created comment
    } catch (err) {
        res.status(400).json(err); // Send a Bad Request status if there's an error
    }
});

// Route to delete a blog post by its ID
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // Delete the specified blog post if it belongs to the current user
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id, // Ensure the blog post belongs to the current user
            },
        });

        if (!blogData) {
            res.status(404).json({ message: 'No blog post found with this id!' });
            return;
        }

        res.status(200).json(blogData); // Send back the deleted blog post
    } catch (err) {
        res.status(500).json(err); // Send a server error status if there's an error
    }
});

module.exports = router;
