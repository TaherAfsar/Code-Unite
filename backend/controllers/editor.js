const Room = require("../models/room");

const getProblemId = async (req, res) => {
  const { id } = req.body;
  // const { roomId } = req.params;
  // console.log(req.params)
  try {
    const room = await Room.find({
       room_id: id,
    }).select({ problem_id: 1, _id: 0 });
    res.status(200).json(room);
  } catch (e) {
    res.status(500).json(e);
    console.log(e);
  }
};

module.exports = getProblemId;
