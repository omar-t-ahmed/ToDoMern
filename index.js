import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { Task } from "./models/taskModel.js";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.status(234).send("Welcome to Tasklist");
});

app.post('/tasks', async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({ message: 'missing required fields' });
        }
        const newTask = {
            title: req.body.title,
            completed: req.body.completed,
            notes: req?.body?.notes
        };

        const task = await Task.create(newTask);

        return res.status(201).send(task);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).json(tasks);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        return res.status(200).json(task);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

app.put('/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedTask) {
            return res.status(404).send({ message: 'Task not found' });
        }
        return res.status(200).json(updatedTask);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('app connected to DB');
        app.listen(PORT, () => {
            console.log(`app is listening to port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });