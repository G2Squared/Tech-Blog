const router = require('express').Router();
const { User } = require('../../models');

// Route to register a new user
router.post('/', async (req, res) => {
    try {
        // Create a new user with the data from the request body
        const userData = await User.create(req.body);

        // Save user session data
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            // Send back a success status with the user data
            res.status(200).json(userData);
        });
    } catch (err) {
        // Send a Bad Request status if there's an error
        res.status(400).json(err);
    }
});

// Route to log in an existing user
router.post('/login', async (req, res) => {
    try {
        // Find the user by their email
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            // Send an error message if user data is not found
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // Check if the provided password matches the stored password for the user
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            // Send an error message if the password is incorrect
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // Save user session data
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            // Send back a success status with the user data and a message
            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        // Send a Bad Request status if there's an error
        res.status(400).json(err);
    }
});

// Route to log out the current user
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        // Destroy the user session and send back a success status
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        // Send a Not Found status if the user is not logged in
        res.status(404).end();
    }
});

module.exports = router;
