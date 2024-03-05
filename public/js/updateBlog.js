// Function to handle the click event on the edit button
const editButtonClick = async (event) => {
    // Get the contents, id, and title of the blog post to be edited
    const contents = document.querySelector('#editBlogContent').value.trim();
    const id = event.target.getAttribute('dataId');
    const title = document.querySelector('#editBlogTitle').value.trim();

    // Create an object to send through the request with the updated blog content, id, and title
    const blogObject = {
        contents: contents,
        blogId: id,
        blogTitle: title
    };

    // Check if contents, id, and title exist
    if (contents && id && title) {
        // Send a PUT request to update the blog post
        const response = await fetch(`/api/blogs/update`, {
            method: 'PUT',
            body: JSON.stringify({ blogObject }), // Ensure it contains 'contents' as it's the column name in SQL
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // If the update is successful, redirect the user to the updated blog post
        if (response.ok) {
            document.location.replace(`/blog/${id}`);
        } else {
            // Alert the user if the update fails
            alert('Failed to update blog');
        }
    }
};

// Event listener to handle the click event on the edit button
document
    .querySelector('.editButt')
    .addEventListener('click', editButtonClick);
