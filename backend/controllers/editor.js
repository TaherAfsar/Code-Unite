const Room = require("../models/room");

// const getProblemId = async (req, res) => {
//   const { id } = req.body;
//   // const { roomId } = req.params;
//   // console.log(req.params)
//   try {
//     const room = await Room.findOne({
//       room_id: id,
//     }).select({ problem_id: 1, _id: 0 });
//     res.status(200).json(room);
//   } catch (e) {
//     res.status(500).json(e);
//     console.log(e);
//   }
// };
const getProblemId = async (req, res) => {
  const { id } = req.body;

  // console.log(id);
  try {
    const room = await Room.findOne({ roomId: id }).select({
      problem_id: 1,
      _id: 0,
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    // console.log("hi");
    res.status(200).json(room);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
const execute =  async(req, res) => {
  const program = req.body;
  console.log(program)
const API_URL = "https://api.jdoodle.com/v1/execute";

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify(program),
  });
  const data = await response.json();
  res.status(200).json(data);
}
module.exports = {getProblemId, execute};
