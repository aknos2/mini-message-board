import { format } from 'date-fns';

export const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: format(new Date(), 'MMM dd yyyy HH:mm:ss')
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: format(new Date(), 'MMM dd yyyy HH:mm:ss')
  }
];
