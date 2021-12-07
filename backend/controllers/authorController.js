const express = require("express");
const validator = require("validator");

const router = express.Router();

const authorModel = require("../models/authorModel");

// Define a /api/authors endpoint that shows existing authors
router.get("/authors", (req, res) => {
    authorModel.getAllAuthors()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error => {
            console.log(error);
            res.status(500).json("query error");
        }));
});

// Define an /api/authors/:id endpoint that shows existing author that has :id
router.get("/authors/:id", (req, res) => {
    authorModel.getAuthorById(req.params.id)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json("failed to find author by id");
            }
        })
        .catch((error) => {
            // Log sl error to node console
            console.log(error)
            res.status(500).json("query error");
        })
})

// Define an /api/authors/create endpoint that creates new author
router.post("/authors/create", (req, res) => {
    let author = req.body

    if (author.deathyear === '') {
        authorModel.createAuthorNull(
                validator.escape(author.name),
                validator.escape(author.surname),
                validator.escape(author.nationality),
                validator.escape(author.birthyear)
            )
            .then((result) => {
                res.status(200).json("author created");
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json("query error - failed to create author");
            });
    } else {
        authorModel.createAuthor(
                validator.escape(author.name),
                validator.escape(author.surname),
                validator.escape(author.nationality),
                validator.escape(author.birthyear),
                validator.escape(author.deathyear)
            )
            .then((result) => {
                res.status(200).json("author created");
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json("query error - failed to create author");
            });
    };
});

// Define an /api/authors/update endpoint that updates an existing author
router.post("/authors/update", (req, res) => {
    let author = req.body

    if (author.deathyear === '') {
        authorModel.updateAuthorNull(
                validator.escape(author.authorId),
                validator.escape(author.name),
                validator.escape(author.surname),
                validator.escape(author.nationality),
                validator.escape(author.birthyear)
            )
            .then((result) => {
                res.status(200).json("author updated");
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json("query error - failed to update author");
            });
    } else {
        authorModel.updateAuthor(
                validator.escape(author.authorId),
                validator.escape(author.name),
                validator.escape(author.surname),
                validator.escape(author.nationality),
                validator.escape(author.birthyear),
                validator.escape(author.deathyear)
            )
            .then((result) => {
                res.status(200).json("author updated");
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json("query error - failed to update author");
            });
    };
});

// Define an /api/authors/delete endpoint that deletes an existing author
router.post("/authors/delete", (req, res) => {
    // Access the author id from the body
    let authorId = req.body.authorId;

    // Ask the model to delete the user with userId
    authorModel.deleteAuthor(authorId)
        .then((result) => {
            if (result.affectedRows > 0) {
                res.status(200).json("author deleted");
            } else {
                res.status(404).json("author not found");
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json("failed to delete author - query error")
        });
});

module.exports = router;