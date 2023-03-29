const express = require("express");
const router = express.Router();
const getProblemId = require("../controllers/editor");

router.post("/problemId", getProblemId);

module.exports = router;
