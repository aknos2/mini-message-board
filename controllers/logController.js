import asyncHandler from "express-async-handler";
import { displayAllMessages, sendMessage, getMessagesByUsername } from "../db/queries.js";
import { formatMessageDates } from "./utils/dateFormat.js";
import { body, validationResult } from 'express-validator';

const messageValidate = [
  body('author')
    .trim()
    .isLength({ min: 2, max: 20 }).withMessage('Author must be 2-20 characters long')
    .matches(/^[a-zA-Z0-9\s]+$/).withMessage('Author must contain only letters, numbers, and spaces'),

  body('message')
    .trim()
    .isLength({ min: 1, max: 500 }).withMessage('Message cannot be empty and max 500 characters')
    .matches(/^[a-zA-Z0-9\s.,!?'"()-]+$/).withMessage('Message contains invalid characters'),
];

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

export const sendMessages = [
  messageValidate,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('form', {
        title: 'Send Message',
        errors: errors.array(),
        data: req.body // to repopulate form
      });
    }

    const { author, message } = req.body;
    await sendMessage(author, message);
    res.redirect('/');
  })
];
