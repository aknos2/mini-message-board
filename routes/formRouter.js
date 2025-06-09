import { Router } from "express";
import { messages } from "../views/data/messages.js";
import { format } from "date-fns";

export const formRouter = Router();

formRouter.get('/', (req, res) => {
  res.render('form', { title: "Send Message"});
});

formRouter.post('/', (req, res) => {
  const { author, message } = req.body;
  messages.push({ text: message, user: author, added: format(new Date(), 'MMM dd yyyy HH:mm:ss')});
  res.redirect('/');
});