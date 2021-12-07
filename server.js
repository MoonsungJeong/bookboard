const express = require("express");
const session = require("express-session");

const fileUpload = require("express-fileupload");
const bodyParser = require('body-parser');

const server = express();
const port = 8080;

// Enable middleware for JSON and urlencoded form data
server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));

// Enable middleware for body-parser
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({
    extended: true
}));

// Enable session middleware so that we have state!
server.use(session({
    secret: "secret phrase abc123",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}))
// fileUpload middleware
server.use(fileUpload({
    limits: {
        fileSize: 50 * 1024 * 1024
    },
}));

// access contol middleware
server.use((req, res, next) => {
    // The user is logged in if they have session data
    let userLoggedIn = req.session.user != null;
    // Define a list of allowed URLs for non-logged in uses
    let allowedURLs = [
        "/",
        "/login.html",
        "/js/login.js",
        "/css/style.css",
        "/api/users/login",
        "/view_books.html",
        "/js/view_books.js",
        "/api/books",
        "/js/book.js",
        "/js/menu.js",
        "/api/users/check",
        "/js/logout.js",
        "/api/users/logout"
    ];
    // Define a list of allowed URLs for logged in user
    let userAllowedURLs = [
        "/",
        "/login.html",
        "/js/login.js",
        "/css/style.css",
        "/api/users/login",
        "/view_books.html",
        "/js/view_books.js",
        "/api/books",
        "/js/book.js",
        "/js/menu.js",
        "/api/users/check",
        "/js/logout.js",
        "/api/users/logout"
    ]
    // If the user is logged in
    if (userLoggedIn) {
        // If the user is 'admin'
        if (req.session.user.accessRights == 'admin') {
            next();
        } else {
            if (userAllowedURLs.includes(req.originalUrl)) {
                // If the user is 'user' and the URL they want is allowed
                next();
            } else if (req.originalUrl.match(/\/img./i)) {
                // Allow path start as "/img"
                next();
            } else if (req.originalUrl.match(/\/book\.html\?id=./i)) {
                // Allow path start as "/book.html?id="
                next();
            } else if (req.originalUrl.match(/\/api\/books\/./i)) {
                // Allow path start as "/api/books/:id"
                next();
            } else {
                // If not allowed - redirect to the index page
                res.redirect("/");
            }
        }
    } else {
        // Else (they are not logged in)
        // Check if the URL they want is allowed
        if (allowedURLs.includes(req.originalUrl)) {
            // Allow the guest user through
            next();
        } else if (req.originalUrl.match(/\/img./i)) {
            // Allow path start as "/img"
            next();
        } else if (req.originalUrl.match(/\/book\.html\?id=./i)) {
            // Allow path start as "/book.html?id="
            next();
        } else if (req.originalUrl.match(/\/api\/books\/./i)) {
            // Allow path start as "/api/books/:id"
            next();
        } else {
            // If not allowed - redirect to the login page
            res.redirect("/login.html");
        }
    }
});

// Serve static frontend resources
server.use(express.static("frontend"));

// Link up author controller
const authorController = require("./backend/controllers/authorController");
server.use("/api", authorController);

// Link up book controller
const bookController = require("./backend/controllers/bookController");
server.use("/api", bookController);

// Link up user controller
const userController = require("./backend/controllers/userController");
server.use("/api", userController);

// Link up user controller
const logController = require("./backend/controllers/logController");
server.use("/api", logController);


// Start the express server
server.listen(port, () => {
    console.log("Backend listening on http://localhost:" + port);
})