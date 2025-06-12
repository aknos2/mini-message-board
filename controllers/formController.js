import { body, validationResult } from 'express-validator';
import { sendMessage } from '../db/queries.js';
import asyncHandler from 'express-async-handler';

export const messageValidationRules = [
  body('author')
    .trim()
    .isLength({ min: 2, max: 20 }).withMessage('Author must be 2-20 characters long')
    .matches(/^[a-zA-Z0-9\s]+$/).withMessage('Author must contain only letters, numbers, and spaces'),

  body('message')
    .trim()
    .isLength({ min: 1, max: 500 }).withMessage('Message cannot be empty and max 500 characters')
    .matches(/^[a-zA-Z0-9\s.,!?'"()-]+$/).withMessage('Message contains invalid characters'),
];


export const sendMessages = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Render your form again with errors and previously submitted data
    return res.status(400).render('form', {
      errors: errors.array(),
      data: req.body,
    });
  }

  const { author, message } = req.body;
  await sendMessage(author, message);
  res.redirect('/');
});

