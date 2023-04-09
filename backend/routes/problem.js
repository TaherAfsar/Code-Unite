const express = require("express");
const router = express.Router();
const {
  getAllProblems,
  getProblemById,
  selectproblem,
  uploadProblem,
} = require("../controllers/problem.js");

router.get("/fetch", getAllProblems);
router.get("/fetch/:id", getProblemById);
router.post("/select", selectproblem);
router.post("/upload", uploadProblem);
module.exports = router;
