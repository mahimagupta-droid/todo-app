import express from 'express';
import todoRouter from './routes/todo.js'
const app = express();

app.use(express.json());
app.use('/todo', todoRouter);

export default app;