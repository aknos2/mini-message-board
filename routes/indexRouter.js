import { Router } from "express";
import { displayMessages } from "../controllers/logController.js";

export const indexRouter = Router();

indexRouter.get('/', displayMessages);
