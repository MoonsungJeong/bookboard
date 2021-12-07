const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userModel = require("../models/userModel");

const router = express.Router();

// Define an /api/users/update endpoint that shows existing users
router.get("/users", (req, res) => {
    userModel.getAllUsers()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error => {
            console.log(error);
            res.status(500).json("query error");
        }))
});

// Define an /api/users/:id endpoint that shows existing user that has :id
router.get("/users/:id", (req, res) => {
    userModel.getUserById(req.params.id)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json("failed to find user by id");
            }
        })
        .catch((error) => {
            // Log sl error to node console
            console.log(error)
            res.status(500).json("query error");
        })
});

// Define an /api/users/create endpoint that creates new user
router.post("/users/create", (req, res) => {
    let user = req.body
    // Hash the password before inserting into the DB
    let hashedPassword = bcrypt.hashSync(user.password, 6);

    userModel.createUser(
            validator.escape(user.firstname),
            validator.escape(user.lastname),
            validator.escape(user.email),
            validator.escape(user.username),
            hashedPassword, // we now store the hashed password
            validator.escape(user.accessrights)
        )
        .then((result) => {
            res.status(200).json("user created");
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json("query error - failed to create user");
        });
});

// Define an /api/users/update endpoint that updates an existing user
router.post("/users/update", (req, res) => {
    // the req.body represents the posted json data
    let user = req.body;
    // If the password does not start with a $ then we need to hash it.
    let hahsedpassword = user.password;
    if (!user.password.startsWith("$2b$")) {
        hahsedpassword = bcrypt.hashSync(user.password, 6);
    }

    // Each of the names below reference the "name" attribute in the form
    userModel.updateUser(
            validator.escape(user.userId),
            validator.escape(user.firstname),
            validator.escape(user.lastname),
            validator.escape(user.email),
            validator.escape(user.username),
            hahsedpassword, // Use the hashed passworrd
            validator.escape(user.accessrights)
        )
        .then((result) => {
            if (result.affectedRows > 0) {
                res.status(200).json("user updated");
            } else {
                res.status(404).json("user not found");
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json("failed to update user - query error");
        })
})

// Define an /api/users/delete endpoint that deletes an existing user
router.post("/users/delete", (req, res) => {
    // Access the user id from the body
    let userId = req.body.userId;
    // Ask the model to delete the user with userId
    userModel.deleteUser(userId)
        .then((result) => {
            if (result.affectedRows > 0) {
                res.status(200).json("user deleted");
            } else {
                res.status(404).json("user not found");
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json("failed to delete user - query error")
        })
})

// Define an /api/users/login endpoint that does login process
router.post("/users/login", (req, res) => {
    let login = req.body;

    userModel.getUserByUsername(login.username)
        .then((results) => {
            // Did we find a user with mathcing username?
            if (results.length > 0) {
                let user = results[0];

                // verify the users password
                if (bcrypt.compareSync(login.password, user.password)) {
                    
                    // setup the session
                    req.session.user = {
                        userId: user.userID,
                        accessRights: user.accessRights,
                    }

                    if (req.session.user.accessRights === 'admin') {
                        res.status(200).json("welcome admin");
                    } else {
                        res.status(200).json("login successfull");
                    }
                } else {
                    // This else case runs if the password did NOT match.
                    res.status(401).json("login failed");
                }
            }else{
                // This else case runs if the username did NOT match.
                res.status(401).json("login failed");
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to login - query error");
        })
})






// Define an /api/users/check endpoint that checks user's accessRights
router.post("/users/check", (req, res) => {
    if (req.session.user == null) {
        res.status(200).json("guest");
    } else {
        if (req.session.user.accessRights == 'user') {
            res.status(200).json("user");
        } else if (req.session.user.accessRights == 'admin') {
            res.status(200).json("admin");
        }
    }
})

// Define an /api/users/logout endpoint that does logout process
router.post("/users/logout", (req, res) => {
    req.session.destroy();
    res.status(200).json("logged out");
})

module.exports = router;