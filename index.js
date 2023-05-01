import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { register, login } from './controllers/User.controller.js';
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());

app.use(cors({
origin: 'http://localhost:3000',
credentials: true,
}));

const PORT = process.env.PORT || 4000;
const DB_CONNECTION = process.env.CONNECTION_URI;

app.get('/', (req, res) => { res.send("Mongo DB API Server...")});
app.use('/register', register);
app.use('/login', login);

const StartDB = async () => {
    await mongoose.connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log("connected to mongodb & server running on port:"+" "+PORT)))
    .catch((error) => {console.log(error)});
};

StartDB();

