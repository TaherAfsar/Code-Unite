const Problem = require("../models/problem");
const Room = require("../models/room");
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
const selectproblem = async (req, res) => {
  const { roomId, problem_id } = req.body;
  const filter = { roomId: roomId }; // Find documents where orderNumber equals "1001"
  const update = { $set: { problem_id: problem_id } }; // Set the customerName field to "John Doe"

  Room.updateOne(filter, update, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`${res.modifiedCount} document(s) updated`);
    }
  });
};
module.exports = { getAllProblems, getProblemById, selectproblem };
