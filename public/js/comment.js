// Function to handle form submission for creating a comment
const createCommentFormHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get the text contents of the comment input field
    const textContents = document.querySelector('#commentContent');
    const contents = textContents.value.trim();

    // Get the ID of the blog associated with the comment
    const blogId = textContents.getAttribute('dataId');

    console.log("Comment: " + contents);
    console.log("ID is " + blogId);

    // Create an object to send in the request body with comment content and blog ID
    const bodyObject = {
        contents: contents,
        blogId: blogId
    };

    // If the comment content exists
    if (contents) {
        try {
            // Send a POST request to create the comment
            const response = await fetch(`/api/blogs/comments`, {
                method: 'POST',
                body: JSON.stringify({ bodyObject }), // Send the bodyObject as the request body
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // If the request is successful, refresh the page to display the new comment
            if (response.ok) {
                document.location.replace(`/blog/${blogId}`);
            } else {
                // Alert the user if creating the comment failed
                alert('Failed to create comment');
            }
        } catch (error) {
            console.error('Error creating comment:', error);
            // Handle any errors that occur during the process
            alert('An error occurred while creating the comment.');
        }
    }
};

// Event listener to handle form submission when creating a comment
document
  .querySelector('.commentForm')
  .addEventListener('submit', createCommentFormHandler);
