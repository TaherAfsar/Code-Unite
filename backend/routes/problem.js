const express = require("express");
const router = express.Router();
const {
  getAllProblems,
  getProblemById,
  selectproblem,
} = require("../controllers/problem.js");

router.get("/fetch", getAllProblems);
router.get("/fetch/:id", getProblemById);
router.post("/select", selectproblem);

module.exports = router;
