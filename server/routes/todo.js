import TodoModel from './../models/Todo.js'
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  const todos = await TodoModel.find();
  res.send(todos);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const todo = await TodoModel.findById(id)
  if(!todo) return res.status(404).json({
    message: "Id not found"
  });
  res.json(todo);
})

router.post('/', async (req, res) => {
    const {title, status} = req.body;
    const newTodo = await TodoModel.create({
      title, 
      status
    })
    res.json(newTodo);
})

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const {title, status} = req.body;
  const updatedTodo = await TodoModel.findByIdAndUpdate(
    id,
    {
      title, 
      status
    }, 
    {new: true}
  )
  if(!updatedTodo) return res.status(404).json({
    message: "Todo not updated"
  })
  return res.json(updatedTodo);
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const deletedTodo = await TodoModel.findByIdAndDelete(id)
  if(!deletedTodo) return res.status(404).json({
    message: "Todo not deleted"
  })
  return res.json(deletedTodo);
})

export default router;