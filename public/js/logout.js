// Function to handle user logout
const logout = async () => {
    console.log("clicked"); // Log a message indicating the logout button was clicked

    // Send a POST request to the server to logout
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    // If the logout is successful, redirect the user to the homepage
    if (response.ok) {
        document.location.replace('/'); // Redirect to the homepage
    } else {
        // Alert the user with the error message from the response
        alert(response.statusText);
    }
};

// Event listener to handle the click event on the logout button
document.querySelector('#logout').addEventListener('click', logout);
