const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();

// Set views directory and view engine for server-side rendered pages
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'supersecret',
    resave: true,
    saveUninitialized: true
}));

const authMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
};

app.get('/login', (req, res) => {
    res.render('login'); // Assuming there's an 'login.ejs' file in the 'views' directory
});

app.post('/login', (req, res) => {
    // For this example, we're using in-code username and password checks.
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        req.session.loggedIn = true;
        res.redirect('/dashboard');
    } else {
        res.send('Invalid username or password');
    }
});

app.get('/dashboard', authMiddleware, (req, res) => {
    res.render('dashboard'); // Assuming there's an 'dashboard.ejs' file in the 'views' directory
});

app.post('/dashboard/commands', authMiddleware, (req, res) => {
    // This endpoint's functionality should be implemented as needed.
    res.send('Command functionality is to be implemented.');
});

app.post('/dashboard/shutdown', authMiddleware, (req, res) => {
    res.send('Server shutting down.');
    process.exit();
});

app.post('/dashboard/restart', authMiddleware, (req, res) => {
    // This should be handled carefully as it will affect all apps managed by pm2. Security implications should be considered.
    res.send('Server restarting functionality is to be implemented.');
});

// Add more middleware or routes as needed

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;