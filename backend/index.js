import express from "express";
import bodyParser from "body-parser";
import { db } from "./db/connect.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import teamRouter from "./routes/teamRoutes.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use("/api", userRouter);
app.use("/api", teamRouter);

const port = 3001;

app.listen(port, () => {
  console.log("Server is listening on port " + port);
  db();
});
