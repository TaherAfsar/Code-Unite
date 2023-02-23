import { Router } from 'express';
import { createRoom, getRoomsOfUser, joinRoom, codeSave } from '../controllers/room.js';
const router = Router();

// new room
router.post("/room", createRoom);

// join room
router.post("/joinroom", joinRoom);

// get rooms of a user
router.get("/room/:userId", getRoomsOfUser);

// post code to DB
router.post("/code", codeSave);

export default router;
