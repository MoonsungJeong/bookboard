const express = require("express");
const logModel = require("../models/logModel");
const router = express.Router();

// Define an /api/logs endpoint that show existing logs
router.get("/logs", (req, res) => {
    logModel.getAllLogs()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error => {
            console.log(error);
            res.status(500).json("query error");
        }));
});

module.exports = router;