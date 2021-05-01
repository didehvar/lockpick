export function chatMessage(message: string) {
  emit('chat:addMessage', {
    args: [message],
  });
}
