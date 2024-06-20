import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { Task } from "./models/taskModel.js";

const app = express()

app.use(express.json())

app.get('/', (req, res) => {

})

app.post('/tasks', async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({message: 'missing required fields'})
        };
        const newTask = {
            title: req.body.title,
            completed : req.body.completed,
            notes: req?.body?.notes
        }

        const task = await Task.create(newTask)

        return res.status(201).send(task)
    } catch (error) {
        console.log(error.message)
    }
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