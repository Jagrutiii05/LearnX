import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./utils/mongo.js";

const app = express();
dotenv.config({});

// middleware
// helps your server handle incoming requests with JSON payloads
app.use(express.json())
// helps your server handle incoming requests with URL-encoded payloads
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
const corsOpt = {
    origin: 'http//localhost:5173',
    credentials: true
}
// It decides who gets in (or rather, which domains are allowed to talk to your server)
app.use(cors(corsOpt))

const port = process.env.PORT || 3000

app.listen(port, (req, res) => {
    connectDB();
    console.log(`Server is running on port ${port}`)
})