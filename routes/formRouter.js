import { Router } from "express";
import { sendMessages } from "../controllers/logController.js";

export const formRouter = Router();

formRouter.get('/', (req, res) => {
  res.render('form', { title: "Send Message"});
});

formRouter.post('/', sendMessages);