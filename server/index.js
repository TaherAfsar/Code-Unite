import express, { urlencoded, json } from 'express';
const app = express();
import { connect } from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import problemRouter from './routes/problem.js'
import userRouter from './routes/user.js';
import messageRouter from './routes/message.js';
import roomRouter from './routes/room.js';

// Connection
const conStr = 'mongodb://localhost:27017/userdb';

connect(process.env.MONGO_URI,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,  // Use IPv4, skip trying IPv6
})
.then(()=> console.log("Connected"))
.catch(err => console.log('Mongodb error',err))




app.use(urlencoded({extended:true}))
app.use(json())  //parses json in post request
app.use('/problem',problemRouter)
app.use('/user',userRouter)
app.use('/message',messageRouter)
app.use('/room',roomRouter)

const PORT = process.env.PORT || 8080;

app.listen(3000,()=>{
    console.log(`Server running on port ${PORT}`)
})


