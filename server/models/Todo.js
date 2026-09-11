import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    title: String,
    status: String
})

const TodoModel = mongoose.model("todos", TodoSchema);
export default TodoModel;