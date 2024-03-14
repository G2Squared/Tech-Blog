const editButtonClick = async (event) => { // Edit button handler
    
    const contents = document.querySelector('#editBlogContent').value.trim();
    const id = event.target.getAttribute('dataId');
    const title = document.querySelector('#editBlogTitle').value.trim();

    const blogObject = { // Send object through request with comment content and blog id
        contents: contents,
        blogId: id,
        blogTitle: title
    };

    if (contents && id && title) { // make sure these exist

        const response = await fetch(`/api/blogs/update`, { // Sent out POST request
        method: 'PUT',
        body: JSON.stringify({ blogObject }), // Be sure it says 'contents' because that's the name of the column in sql
        headers: {
            'Content-Type': 'application/json',
        },
        });

        if (response.ok) {
        document.location.replace(`/blog/${id}`); // redirect them to updated blog post
        } else {
        alert('Failed to update blog');
        }
    }
};

document
  .querySelector('.editButt')
  .addEventListener('click', editButtonClick);
