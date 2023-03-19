const Problem = require("../models/problem");

const getAllProblems = async (req, res) => {
  const allProblems = await Problem.find({});
  // await Problem.findByIdAndDelete(problem.id) -> delete incomplete problems
  for (var problem of allProblems) {
    console.log(problem.testcases);
  }
  res.send(allProblems);
};

const getProblemById = async (req, res) => {
  const fetchId = req.params.id;
  Problem.findById(fetchId, (err, val) => {
    if (err) {
      console.log(err);
    } else {
      res.send(val);
    }
  });
};

module.exports = { getAllProblems, getProblemById };
