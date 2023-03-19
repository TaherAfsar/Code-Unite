const express = require("express");
const router = express.Router();
const { getAllProblems, getProblemById } = require("../controllers/problem.js");

router.get("/fetch", getAllProblems);
router.get("/fetch/:id", getProblemById);

module.exports = router;
