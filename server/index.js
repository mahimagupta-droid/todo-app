import app from './app.js';
import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(3000);
  console.log("server running successfully and connected to mongodb database as well")
}).catch((e) => {
  console.log(e);
})