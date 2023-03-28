const Room = require("../models/room");

const getProblemId = async (req, res) => {
  const { Id } = req.body;
  const data = Room.findOne({ roomId: Id }, {});
  console.log(data.__id);
  res.send(data.__id);
};

module.exports = getProblemId;
