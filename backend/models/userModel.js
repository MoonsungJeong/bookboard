// Access the database connection from database.js
const db = require("../database");

module.exports.getAllUsers = () => {
    return db.query("SELECT userID, firstName, lastName, email, username, accessRights FROM users WHERE deleteFlag = 0");
}

module.exports.getUserByUsername = (username) => {
    return db.query("SELECT * FROM users WHERE username = ? and deleteFlag = 0", [username]);
}

module.exports.createUser = (firstName, lastName, email, username, password, accessRights) => {
    return db.query("INSERT INTO `users` (firstName, lastName, email, username, password, accessRights) " +
        "VALUES (?,?,?,?,?,?)", [firstName, lastName, email, username, password, accessRights]);
}

module.exports.getUserById = (id) => {
    return db.query("SELECT * FROM users WHERE userId = ? and deleteFlag = 0", [id]);
}

module.exports.updateUser = (userId, firstName, lastName, email, username, password, accessRights) => {
    return db.query("UPDATE users SET firstName = ?, lastName = ?, email = ?, username = ?," +
        "password = ?, accessRights = ? WHERE userId = ?", [firstName, lastName, email, username, password, accessRights, userId]);
}

module.exports.deleteUser = (userId) => {
    return db.query("UPDATE users SET deleteFlag = 1 WHERE userID = ?", [userId]);
}