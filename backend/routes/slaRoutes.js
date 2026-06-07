const express = require("express");

const router = express.Router();

const {
    getStats,
    getLogs
} = require("../controllers/slaController");

router.get("/stats", getStats);

router.get("/logs", getLogs);

module.exports = router;