import { format } from 'date-fns';

export function formatMessageDates(messages) {
  return messages.map(msg => ({
    ...msg,
    added: format(new Date(msg.added), 'MMM dd yyyy HH:mm:ss')
  }));
}
