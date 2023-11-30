import express from "express";
import {
  addUser,
  deletUser,
  filterUsers,
  getUsersWithId,
  getUsers,
  updateUser,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.get("/users", getUsers);
userRouter.get("/users/:id", getUsersWithId);
userRouter.post("/users", addUser);
userRouter.put("/users/:id", updateUser);
userRouter.delete("/users/:id", deletUser);
userRouter.delete("/users/filter", filterUsers);

export default userRouter;
