const express = require("express");
const router = express.Router();
const getProblemId = require("../controllers/editor");

router.get("/problemId", getProblemId);

module.exports = router;
