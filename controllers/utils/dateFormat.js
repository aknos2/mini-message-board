export function formatMessageDates(messages) {
  return messages.map(msg => ({
    ...msg,
    added: new Date(msg.added).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  }));
}
