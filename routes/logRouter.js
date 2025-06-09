import { Router } from "express";
import { getMessageUser } from "../controllers/logController.js";

export const logRouter = Router();

logRouter.get('/:username', getMessageUser);
