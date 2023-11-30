import express from "express";
import { db } from "./db/connect.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use("/api", userRouter);

const port = 3001;

app.listen(port, () => {
  console.log("Server is listening on port " + port);
  db();
});
