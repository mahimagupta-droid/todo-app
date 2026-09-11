import express from "express";
const router = express.Router();

const todos = [
  {
    id: 1,
    title: "find internship",
    status: "completed",
  },
];

router.get("/", (req, res) => {
  res.send(todos);
});

router.post('/', (req, res) => {
    const {title, status} = req.body;
    const todo = {
        id: todos.length + 1,
        title: title,
        status: status
    };
    todos.push(todo);
    res.send(todo);
})

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const {title, status} = req.body;
  const todoId = todos.findIndex((todo) => todo.id === id);
  if(todoId == -1) {
    return res.status(404).json({
      message: "Id not found"
    });
  }
  todos[todoId] = {
    id: id,
    title: title,
    status: status
  }
  res.json(todos);
})

export default router;
