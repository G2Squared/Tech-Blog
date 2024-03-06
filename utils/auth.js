// Middleware function to check if the user is logged in
const withAuth = (req, res, next) => {
    // Check if the user is not logged in
    if (!req.session.logged_in) {
        // Redirect them to the login route if not logged in
        res.redirect('/login');
    } else {
        // If the user is logged in, proceed to the next middleware or route handler
        next();
    }
};

module.exports = withAuth; // Export the middleware function for use in other parts of the application
