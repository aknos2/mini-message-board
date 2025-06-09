import asyncHandler from "express-async-handler";
import { messages } from "../views/data/messages.js"; 

export const getMessageUser = asyncHandler(async(req, res) => {
  const { username } = req.params;
  const userMessages = messages.filter(msg => msg.user === username);

  if (!username) {
    throw new CustomNotFoundError(`The user doesn't exist`);
  }

  res.render('log', { title: `Messages log`, messages: userMessages, username});
});