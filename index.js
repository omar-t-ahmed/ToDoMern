import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";

const app = express()

app.get('/', (req, res) => {

})

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('app connected to DB')
        app.listen(PORT, () => {
            console.log(`app is listening to port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error)
    })