import { Router } from "express";
import { messages } from "../views/data/messages.js";

export const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.render('index', { title: "Mini Messageboard", messages });
});
