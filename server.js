const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars'); // for my html pages which are handlebars
const helpers = require('./utils/helpers'); // helper functions (used for time display)

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001; // allows for deployment on heroku and on localhost

// Create handlebars engine with custom helpers
const hbs = exphbs.create({ helpers });

// Session configuration
const sess = {
    secret: 'Shhhhhhh it is a secret....', // Secret for session data
    cookie: {
        maxAge: 300000, // Session duration in milliseconds
        httpOnly: true, // Prevents client-side JavaScript access to the cookie
        secure: false, // Allows the cookie to be sent only over HTTPS
        sameSite: 'strict', // Requires that a cookie should not be sent with cross-site requests
    },
    resave: false, // Don't save session if unmodified
    saveUninitialized: true, // Save new sessions
    store: new SequelizeStore({ // Store session data in Sequelize database
        db: sequelize
    })
};

// Set up session middleware
app.use(session(sess));

// Set view engine to Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for parsing JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use routes defined in the controllers
app.use(routes);

// Sync Sequelize models with the database and start listening on the specified port
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening...'));
});
