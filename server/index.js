import app from "./app.js";
import 'dotenv/config.js'
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log(
        "server running on port 3000 and database connected successfully",
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
