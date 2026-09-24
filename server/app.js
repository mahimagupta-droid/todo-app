import cors from 'cors';
import express from 'express';
import todoRouterHandler from './routes/todo.js'

const app = express();
app.use(express.json());
app.use(cors());
app.use('/todo', todoRouterHandler)

export default app;