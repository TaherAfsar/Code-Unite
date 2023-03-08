import { Router } from 'express';
import { createRoom, getRoomsOfUser, joinRoom, codeSave, deleteRoom, setRoomLimit, roomMembers, removeMember} from '../controllers/room.js';
const router = Router();

// new room
router.post("/room", createRoom);

// join room
router.post("/joinroom", joinRoom);

// get rooms of a user
router.get("/:userId", getRoomsOfUser);

// post code to DB
router.post("/code", codeSave);

router.put('/deleteroom', deleteRoom);

router.put('/roomlimit', setRoomLimit);

router.get('/members/:roomId', roomMembers)

router.put('/removeuser', removeMember);


export default router;
