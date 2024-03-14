const createBlogFormHandler = async (event) => { // handles form to create a blog
    event.preventDefault();
  
    const title = document.querySelector('#blogTitle').value.trim();
    const contents = document.querySelector('#blogContent').value.trim();

    if (title && contents) { // if these exists
      const response = await fetch(`/api/blogs`, { // Sent out POST request
        method: 'POST',
        body: JSON.stringify({ title, contents }), // Be sure it says 'contents' because that's the name of the column in sql
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard'); // refresh page
      } else {
        alert('Failed to create blog');
      }
    }
};
  
const delButtonClick = async (event) => { // Delete button handler
    
    if (event.target.hasAttribute('dataId')) {
      const id = event.target.getAttribute('dataId');
  
      console.log(id);

      const response = await fetch(`/api/blogs/${id}`, { // Send out DELETE response
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard'); // if we are ok then 'refresh' dashboard page
      } else {
        alert('Failed to delete blog');
      }
    }
};

document
  .querySelector('.blogForm')
  .addEventListener('submit', createBlogFormHandler);

document
  .querySelector('.blogList')
  .addEventListener('click', delButtonClick);
