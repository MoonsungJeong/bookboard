const db = require("../database");

module.exports.getAllLogs = () => {
    return db.query("SELECT changeLogID, dateCreated, dateChanged, book.bookTitle, users.username, users.accessRights FROM `changelog` INNER JOIN `book` ON changelog.bookID = book.bookID INNER JOIN `users` ON changelog.userID = users.userID ORDER BY changeLogID");
}

module.exports.createFirstLog = (dateCreated, bookId, userId) => {
    return db.query("INSERT INTO `changelog` (dateCreated, bookID, userID) " +
        "VALUES (?,?,?)", [dateCreated, bookId, userId]);
}

module.exports.createAfterLog = (dateCreated, dateChanged, bookId, userId) => {
    return db.query("INSERT INTO `changelog` (dateCreated, dateChanged, bookID, userID) " +
        "VALUES (?,?,?,?)", [dateCreated, dateChanged, bookId, userId]);
}

module.exports.getCreatedDateOfLogByBookId = (bookId) => {
    return db.query("SELECT dateCreated from `changelog` WHERE bookID = ? ORDER BY changeLogID ASC LIMIT 1", [bookId]);
}