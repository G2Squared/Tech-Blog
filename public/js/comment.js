const createCommentFormHandler = async (event) => { // handles form to create a blog
    event.preventDefault();

    const textContents = document.querySelector('#commentContent');
  
    const contents = textContents.value.trim();
    const blogId = textContents.getAttribute('dataId'); // the blog id associated to the current blog

    console.log("Comment: " + contents);
    console.log("ID is " + blogId);

    const bodyObject = { // Send object through request with comment content and blog id
      contents: contents,
      blogId: blogId
    };
    
    if (contents) { // if it exists
      const response = await fetch(`/api/blogs/comments`, { // Sent out POST request
        method: 'POST',
        body: JSON.stringify({ bodyObject }), // Send out bodyObject as response
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/blog/${blogId}`); // refresh page
      } else {
        alert('Failed to create comment');
      }
    }

    
    
};


document
  .querySelector('.commentForm')
  .addEventListener('submit', createCommentFormHandler);
