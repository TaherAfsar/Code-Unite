import {nanoid} from 'nanoid';
import Room from "../models/Room.js"

export const createRoom = async (req,res) => {
  const { userName, roomName, password } = req.body;
  if (!userName || !roomName || !password) {
    res.status(422).json({ error: "please add all field" });
    return;
  }
  const newRoom = new Room({
    roomId: nanoid(6),
    members: [{ userId: nanoid(4), name: userName , isSuperUser: true}],
    roomName,
    password,
  });

  try {
    const savedRoom = await newRoom.save();
    res.status(200).json(savedRoom);
    console.log('create room called')
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getRoomsOfUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const room = await Room.find({
      "members.userId": userId,
    });
    console.log('get room of user called');
    res.status(200).json(room);
  } catch (e) {
    res.status(500).json(e);
  }
};

export const joinRoom = async (req, res) => {
  const { userName, roomId, user, password } = req.body;
  console.log(req.body)
  if (!userName || !roomId || !password) {
    res.status(422).json({ error: "Please add all fields" });
  } else {
    const room = await Room.findOne({ roomId: roomId });
    
    if(!room)
    {
        res.status(422).json({ error: "Invalid Room Id or password" });
    }
    else if(room.isDeleted)
    {
      res.status(422).json({ error: "Room is deleted" });
    }
    else if(room.password === password)
    {
        if (!user) {
            try {
              const newUser = { userId: nanoid(4), name: userName, isSuperUser: false};
              const join_room = await Room.updateOne(
                { _id: room._id },
                { $push: { members: newUser } },
                { new: true }
              );

              res.status(200).json({
                UserId: newUser.userId,
                UserName: newUser.name,
                RoomId: roomId,
                RoomName: room.roomName,
              });
              console.log(join_room);
            } catch (error) {
              res.status(422).json({ error: error.message });
            }
          } else {
            if (user.RoomId == roomId && user.UserName != userName) {
              //console.log(`you have to login with this user name ${user.UserName}........ `)
              res.status(400).json({
                error: `you have to login with this user name ${user.UserName}`,
              });
            } else {
              res.status(200).json({ msg: `joined room` });
              console.log('room joined')
            }
          }
    }
    else {
        if (user.RoomId == roomId && user.UserName != userName) {
          //console.log(`you have to login with this user name ${user.UserName}........ `)
          res.status(400).json({
            error: `you have to login with this user name ${user.UserName}`,
          });
        } else {
          res.status(200).json({ msg: `joined room` });
          console.log('room joined')
        }
      }

  }
};

export const codeSave = async (req,res) => {
  const { roomId, code } = req.body;

  const result = await Room.findOneAndUpdate(
    { roomId: roomId },
    { $set: { code: code } },
    { new: true }
  );
  console.log('code saved')
  res.status(200).json(result);

  return true;
};

export const deleteRoom = async (req,res) => {
  const result = await Room.findOneAndUpdate(
    { roomId: req.body.roomId },
    { $set: { isDeleted: true } },
    { new: true }
  );
  console.log('Room deleted')
  res.status(200).json(result);
}

export const setRoomLimit = async (req,res) => {
  const result = await Room.findOneAndUpdate(
    { roomId: req.body.roomId },
    { $set: { roomLimit: req.body.limit } },
    { new: true }
  );
  console.log(`Limit is changed to ${req.body.limit}`)
  res.status(200).json(result);
}

export const roomMembers = async (req,res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.find({
      "roomId": roomId,
    }).select({members: 1, _id: 0 });
    res.status(200).json(room);
  } catch (e) {
    res.status(500).json(e);
    console.log(e)
  }
}

export const removeMember = async (req,res) => {
  const result = await Room.updateOne(
    { roomId: req.body.roomId },
    {
      $pull: { "members": { "userId": req.body.userId } }
  },
    { new: true }
  );
  console.log('User deleted')
  res.status(200).json(result);
}
export default {createRoom,getRoomsOfUser,joinRoom,codeSave};
