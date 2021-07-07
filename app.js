import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./User/router.js";
dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT;
const db = process.env.DB;

try {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex : true,
        useUnifiedTopology: true,
    });

} catch (err) {
    console.log(err);
}

app.use('/user', userRoute)

app.listen(port, function (){
    console.log("Server is running")
})
