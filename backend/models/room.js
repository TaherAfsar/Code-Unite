import { Schema, model } from "mongoose";

const roomSchema = new Schema(
  {
    roomName: {
      type: String,
      require: true,
    },
    roomId: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    code: {
      type: String,
      default: "",
    },
    roomLimit: {
      type: Number,
    },
    isDeleted: {
      type: Boolean,
    },
    members: {
      type: Array,
      userId: {
        type: String,
      },
      name: {
        type: String,
      },
      isSuperUser: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

const Room = model("room", roomSchema);

export default Room;
