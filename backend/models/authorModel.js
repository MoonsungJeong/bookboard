const db = require("../database");

module.exports.getAllAuthors = () => {
    return db.query("SELECT authorID, name, surname, nationality, birthYear, deathYear FROM author WHERE deleteFlag = 0");
}

module.exports.getAuthorById = (authorId) => {
    return db.query("SELECT authorID, name, surname, nationality, birthYear, deathYear FROM author WHERE authorID = ? and deleteFlag = 0", [authorId]);
}

module.exports.createAuthor = (name, surname, nationality, birthYear, deathYear) => {
    return db.query("INSERT INTO `author` (name, surname, nationality, birthYear, deathYear) " +
        "VALUES (?,?,?,?,?)", [name, surname, nationality, birthYear, deathYear]);
}

module.exports.createAuthorNull = (name, surname, nationality, birthYear) => {
    return db.query("INSERT INTO `author` (name, surname, nationality, birthYear) " +
        "VALUES (?,?,?,?)", [name, surname, nationality, birthYear]);
}

module.exports.updateAuthor = (authorID, name, surname, nationality, birthYear, deathYear) => {
    return db.query("UPDATE `author` SET name = ?, surname = ?, nationality = ?, birthYear = ?," +
        "deathYear = ? WHERE authorID = ?", [name, surname, nationality, birthYear, deathYear, authorID]);
}

module.exports.updateAuthorNull = (authorID, name, surname, nationality, birthYear) => {
    return db.query("UPDATE `author` SET name = ?, surname = ?, nationality = ?, birthYear = ?," +
        "deathYear = NULL WHERE authorID = ?", [name, surname, nationality, birthYear, authorID]);
}

module.exports.deleteAuthor = (authorId) => {
    return db.query("UPDATE `author` SET deleteFlag = 1 WHERE authorID = ?", [authorId]);
}