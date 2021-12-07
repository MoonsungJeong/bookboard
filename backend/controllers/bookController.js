const express = require("express");
const validator = require("validator");
const bookModel = require("../models/bookModel");
const logModel = require("../models/logModel");
const time = require("../time");
const router = express.Router();

// Define a /api/books endpoint that shows existing books
router.get("/books", (req, res) => {
    bookModel.getAllBooks()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error => {
            console.log(error);
            res.status(500).json("query error");
        }))
});

// Define an /api/books/:id endpoint that shows existing user that has :id
router.get("/books/:id", (req, res) => {
    bookModel.getBookById(req.params.id)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json("failed to find book by id");
            }
        })
        .catch((error) => {
            // Log sl error to node console
            console.log(error)
            res.status(500).json("query error");
        })
})

// Define an /api/books/create endpoint that creates new book
router.post("/books/create", (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        //return res.status(400).json("No files were uploaded");
        let book = req.body;
        let myFile = "book.png";
        let _dir = "./frontend/img/"
        let imgServerPath = _dir + myFile;
        let imgDbPath = imgServerPath.substring(10);

        bookModel.createBook(
                validator.escape(book.title),
                validator.escape(book.yearofpublication),
                validator.escape(book.genre),
                validator.escape(book.millionsold),
                validator.escape(book.languagewritten),
                validator.escape(imgDbPath),
                validator.escape(book.author)
            )
            .then((result) => {
                logModel.createFirstLog(
                    validator.escape(time.currentTime()),
                    validator.escape(result.insertId.toString()),
                    validator.escape(req.session.user.userId.toString())
                );
                res.status(200).json("book created");
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json("query error - failed to create book");
            });
    } else {
        let book = req.body;
        let myFile = req.files.myFile;
        let _dir = "./frontend/img/"
        let imgServerPath = _dir + myFile.name;
        let imgDbPath = imgServerPath.substring(10);

        bookModel.createBook(
                validator.escape(book.title),
                validator.escape(book.yearofpublication),
                validator.escape(book.genre),
                validator.escape(book.millionsold),
                validator.escape(book.languagewritten),
                validator.escape(imgDbPath),
                validator.escape(book.author)
            )
            .then((result) => {
                myFile.mv(imgServerPath);
                logModel.createFirstLog(
                    validator.escape(time.currentTime()),
                    validator.escape(result.insertId.toString()),
                    validator.escape(req.session.user.userId.toString())
                );
                res.status(200).json("book created");
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json("query error - failed to create book");
            });
    }
});

// Define an /api/books/update endpoint that updates an existing book
router.post("/books/update", (req, res) => {
    let book = req.body;
    if (!req.files || Object.keys(req.files).length === 0) {
        //console.log("Image no change");
        bookModel.updateBookNoImage(
                validator.escape(book.bookId),
                validator.escape(book.title),
                validator.escape(book.yearofpublication),
                validator.escape(book.genre),
                validator.escape(book.millionsold),
                validator.escape(book.languagewritten),
                validator.escape(book.author)
            )
            .then((result) => {
                if (result.affectedRows > 0) {
                    logModel.getCreatedDateOfLogByBookId(book.bookId)
                        .then(result => {
                            let dateCreated = result[0].dateCreated;
                            logModel.createAfterLog(
                                validator.escape(time.formatDate(dateCreated)),
                                validator.escape(time.currentTime()),
                                validator.escape(book.bookId),
                                validator.escape(req.session.user.userId.toString())
                            );
                        });
                    res.status(200).json("book updated");
                } else {
                    res.status(404).json("book not found");
                }
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json("failed to update book - query error");
            })
    } else {
        //console.log("Image changed");
        let myFile = req.files.myFile;
        let _dir = "./frontend/img/"
        let imgServerPath = _dir + myFile.name;
        let imgDbPath = imgServerPath.substring(10);

        bookModel.updateBook(
                validator.escape(book.bookId),
                validator.escape(book.title),
                validator.escape(book.yearofpublication),
                validator.escape(book.genre),
                validator.escape(book.millionsold),
                validator.escape(book.languagewritten),
                validator.escape(imgDbPath),
                validator.escape(book.author)
            )
            .then((result) => {
                if (result.affectedRows > 0) {
                    logModel.getCreatedDateOfLogByBookId(book.bookId)
                        .then(result => {
                            let dateCreated = result[0].dateCreated;
                            logModel.createAfterLog(
                                validator.escape(time.formatDate(dateCreated)),
                                validator.escape(time.currentTime()),
                                validator.escape(book.bookId),
                                validator.escape(req.session.user.userId.toString())
                            );
                        });
                    myFile.mv(imgServerPath);
                    res.status(200).json("book updated");
                } else {
                    res.status(404).json("book not found");
                }
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json("failed to update book - query error");
            })
    }
});

// Define an /api/books/delete endpoint that deletes an existing book
router.post("/books/delete", (req, res) => {
    let bookId = req.body.bookId;

    bookModel.deleteBook(bookId)
        .then((result) => {
            if (result.affectedRows > 0) {
                res.status(200).json("book deleted");
            } else {
                res.status(404).json("book not found");
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json("failed to delete book - query error")
        });
});

module.exports = router;