const express = require("express");
const router = express.Router();
const {
  getAllProblems,
  getProblemById,
  selectproblem,
  uploadProblem,
  deleteproblem,
  adminProblem,
} = require("../controllers/problem.js");

router.get("/fetch", getAllProblems);
router.get("/fetch/:id", getProblemById);
router.post("/select", selectproblem);
router.post("/delete", deleteproblem);
router.post("/upload", uploadProblem);
router.get("/adminps", adminProblem);
module.exports = router;
