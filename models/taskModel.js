import mongoose from "mongoose"

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        notes: {
            type: Text,
            required: false
        },
        completed: {
            type: Boolean,
            required: true
        },
    },
    {
        timestamps: true,
    }
)

export const Task = mongoose.model('Task', taskSchema)