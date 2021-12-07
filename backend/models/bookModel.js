// Access the database connection from database.js
const db = require("../database");

module.exports.getAllBooks = () => {
    return db.query("SELECT bookID, bookTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, author.name as authorName FROM book inner join author on book.authorID = author.authorID WHERE book.deleteFlag = 0");
}

module.exports.getBookById = (id) => {
    return db.query("SELECT bookID, bookTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, book.authorID, author.name as authorName FROM book inner join author on book.authorID = author.authorID where bookID = ? and book.deleteFlag = 0", [id]);   
}

module.exports.createBook = (title, yearofpublication, genre, millionsold, languagewritten, imgDbPath, author) => {
    return db.query("INSERT INTO `book` (bookTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID) " +
        "VALUES (?,?,?,?,?,?,?)", [title, yearofpublication, genre, millionsold, languagewritten, imgDbPath, author]);
}

module.exports.updateBook = (bookID, title, yearofpublication, genre, millionsold, languagewritten, imgDbPath, author) => {
    return db.query("UPDATE `book` SET bookTitle = ?, yearofPublication = ?, genre = ?, millionsSold = ?, languageWritten = ?, coverImagePath = ?, authorID =? " +
        "WHERE bookID = ?", [title, yearofpublication, genre, millionsold, languagewritten, imgDbPath, author, bookID]);
}

module.exports.updateBookNoImage = (bookID, title, yearofpublication, genre, millionsold, languagewritten, author) => {
    return db.query("UPDATE `book` SET bookTitle = ?, yearofPublication = ?, genre = ?, millionsSold = ?, languageWritten = ?, authorID =? " +
        "WHERE bookID = ?", [title, yearofpublication, genre, millionsold, languagewritten, author, bookID]);
}
module.exports.deleteBook = (bookId) => {
    return db.query("UPDATE `book` SET deleteFlag = 1 WHERE bookID = ?", [bookId]);
}