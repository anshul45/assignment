import express from "express";
import { team, createTeam } from "../controller/teamController.js";

const teamRouter = express.Router();

teamRouter.post("/team", createTeam);
teamRouter.get("/team/:id", team);

export default teamRouter;
