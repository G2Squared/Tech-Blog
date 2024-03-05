// Function to handle form submission for creating a blog
const createBlogFormHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get the title and contents of the blog from the input fields
    const title = document.querySelector('#blogTitle').value.trim();
    const contents = document.querySelector('#blogContent').value.trim();

    // If both title and contents exist
    if (title && contents) {
        try {
            // Send a POST request to create the blog
            const response = await fetch(`/api/blogs`, {
                method: 'POST',
                body: JSON.stringify({ title, contents }), // Send title and contents in the request body
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // If the request is successful, redirect to the dashboard page
            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                // Alert the user if creating the blog failed
                alert('Failed to create blog');
            }
        } catch (error) {
            console.error('Error creating blog:', error);
            // Handle any errors that occur during the process
            alert('An error occurred while creating the blog.');
        }
    }
};

// Function to handle click events on the delete button
const delButtonClick = async (event) => {
    if (event.target.hasAttribute('dataId')) { // If the delete button has a dataId attribute
        const id = event.target.getAttribute('dataId'); // Get the ID of the blog to delete

        console.log(id);

        try {
            // Send a DELETE request to delete the blog
            const response = await fetch(`/api/blogs/${id}`, {
                method: 'DELETE',
            });

            // If the request is successful, redirect to the dashboard page
            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                // Alert the user if deleting the blog failed
                alert('Failed to delete blog');
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
            // Handle any errors that occur during the process
            alert('An error occurred while deleting the blog.');
        }
    }
};

// Event listener to handle form submission when creating a blog
document.querySelector('.blogForm').addEventListener('submit', createBlogFormHandler);

// Event listener to handle click events on the delete button
document.querySelector('.blogList').addEventListener('click', delButtonClick);
