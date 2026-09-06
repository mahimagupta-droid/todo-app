import express from 'express';

const router = express.Router();

const todos = [
    {
        id: 1,
        title: "Learn Express",
        completed: false
    },
    {
        id: 2,
        title: "Build Todo API",
        completed: false
    }
];

router.get('/', (req, res) => {
    res.json(todos);
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const fileteredTodo = todos.find((todo) => (todo.id === id));
    if(fileteredTodo){
        res.json(fileteredTodo)
    } else {
        res.status(404).json({
            message: "todo not found"
        })
    }
})

export default router;