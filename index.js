import express from "express";
import { PORT } from "./config.js";

const app = express()

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Welcome to your to do list')
})

app.listen(PORT, () => {
    console.log(`app is listening to port ${PORT}`);
})