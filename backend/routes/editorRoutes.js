const express = require("express");
const router = express.Router();
const {getProblemId, execute} = require("../controllers/editor");
router.post("/problemId", getProblemId);
router.post("/execute",execute)
module.exports = router;
