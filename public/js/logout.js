const logout = async () => {
    console.log("clicked");
    const response = await fetch('/api/users/logout', { // Send out POST request
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/'); // Go back to homepage if we sucessfully log out
    } else {
      alert(response.statusText);
    }
  };
  
document.querySelector('#logout').addEventListener('click', logout); // Listen for the click of the logout button
