import asyncHandler from "express-async-handler";
import { displayAllMessages, sendMessage, getMessagesByUsername } from "../db/queries.js";
import { formatMessageDates } from "./utils/dateFormat.js";

export const getMessageUser = asyncHandler(async(req, res) => {
  const { username } = req.params;

  if (!username) {
    throw new CustomNotFoundError(`The user doesn't exist`);
  }

  const userMessages = formatMessageDates(await getMessagesByUsername(username));

  res.render('log', { title: `Messages log`, messages: userMessages, username});
});

export const displayMessages = asyncHandler(async(req, res) => {
  const allMessages = formatMessageDates(await displayAllMessages());

  res.render('index', {allMessages, title: "Mini Messageboard"});
});

export const sendMessages = asyncHandler(async(req, res) => {
  const { author , message } = req.body;
  await sendMessage( author, message );
  res.redirect('/');
});