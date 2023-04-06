const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const problemRoutes = require("./routes/problem");
const room = require("./routes/room");
const editor = require("./routes/editorRoutes");
// const HomepageRoutes = require("./routes/HomepageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

dotenv.config();
mongoose.set("strictQuery", true);
connectDB();
const app = express();

app.use(express.json()); // to accept json data
app.use(cors(corsOptions))

app.get("/", async (req, res) => {
  let program = {
    script: 'print("hello world");',
    language: "python3",
    versionIndex: "0",
    clientId: "5715b31dddb014988ed4e6b8f1409111",
    clientSecret:
      "d5568ed6f786da78557ab96e073907847f007e721bb0f53effd40b4870caaa84",
  };
const API_URL = "https://api.jdoodle.com/v1/execute";

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify(program),
  });

  const data = await response.json();
  res.send(data);
});

app.use("/api/user", userRoutes);
app.use("/api/problem", problemRoutes);
app.use("/api/room", room);
app.use("/api/editor", editor);
// app.use("/api/HomePage", HomepageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log(`server started on port ${PORT}`.yellow.bold));
