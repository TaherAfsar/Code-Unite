const Room = require("../models/room");
const User = require("../models/userModel");
const request = require('request');

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

const execute = (req, res) => {
  const { script, language, stdin, versionIndex } = req.body;

  const executionData = {
    clientId: process.env.JDOODLE_CLIENT_ID,     // Use environment variables
    clientSecret: process.env.JDOODLE_CLIENT_SECRET,
    script: script,
    language: language,
    stdin: stdin,
    versionIndex: versionIndex,
  };

  const API_URL = 'https://api.jdoodle.com/v1/execute';


  request.post(
    {
      url: API_URL,
      json: executionData,
    },
    (error, response, body) => {
      if (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'JDoodle API call failed' });
      }


      res.status(200).json({
        output: body.output,
        error: body.error,
        cpuTime: body.cpuTime,
      });
    }
  );
};
const updatePoints = async (req, res) => {
  const { username, points } = req.body;
  const update = { $set: { points: points } };
  const filter = { username: username };
  User.updateOne(filter, update, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`${res.modifiedCount} document(s) updated`);
    }
  });
  res.status(200).json({ message: "points updated" });
};

const getPoints = async (req, res) => {
  const { username } = req.body;
  try {
    const points = await User.findOne({ username: username }).select({
      points: 1,
      _id: 0,
    });

    if (!points) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(points);
    res.status(200).json(points);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { getProblemId, execute, updatePoints, getPoints };
