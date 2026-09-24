import express from 'express';
import TodoModel from './../models/Todo.js'

const router = express.Router();

router.get('/', async (req, res) => {
  const response = await TodoModel.find();
  res.send(response)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const response = await TodoModel.findById(id);
  res.send(response);
})

router.post('/', async (req, res) => {
  const {title, status} = req.body;
  const postTodo = await TodoModel.create({
    title: title,
    status: status
  })
  res.send(postTodo)
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const deleteTodo = await TodoModel.findByIdAndDelete(id)
  res.send(deleteTodo); 
})

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const {title, status} = req.body;
  const updateTodo = await TodoModel.findByIdAndUpdate(id, {
    title, status
  }, {
    new: true
  });
  res.send(updateTodo)
})

export default router;