// Function to handle form submission for user login
const loginFormHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get email and password values from the input fields
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // Ensure both email and password exist
    if (email && password) {
        try {
            // Send a POST request to the server to login
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }), // Send email and password in the request body
                headers: { 'Content-Type': 'application/json' },
            });

            // If the login is successful, redirect the user to their dashboard
            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                // Alert the user with the error message from the response
                alert(response.statusText);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle any errors that occur during the process
            alert('An error occurred while logging in.');
        }
    }
};

// Function to handle form submission for user signup
const signupFormHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get name, email, and password values from the input fields
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // Ensure name, email, and password all exist
    if (name && email && password) {
        try {
            // Send a POST request to the server to create a new user
            const response = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }), // Send name, email, and password in the request body
                headers: { 'Content-Type': 'application/json' },
            });

            // If the signup is successful, redirect the user to their dashboard
            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                // Alert the user with the error message from the response
                alert(response.statusText);
            }
        } catch (error) {
            console.error('Error signing up:', error);
            // Handle any errors that occur during the process
            alert('An error occurred while signing up.');
        }
    }
};

// Event listener to handle form submission when logging in
document.querySelector('.loginForm').addEventListener('submit', loginFormHandler);

// Event listener to handle form submission when signing up
document.querySelector('.signupForm').addEventListener('submit', signupFormHandler);
