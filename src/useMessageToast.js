import { useState, useEffect } from "react";

const shouldDelete = now => message => now > message.expires;
const shouldStay = now => message => !shouldDelete(now)(message);
const nextExpire = messages =>
  messages.map(message => message.expires).sort((a, b) => a - b)[0];

const useMessageToast = initialMessages => {
  const [messages, setMessages] = useState(initialMessages);
  useEffect(
    () => {
      if (messages.length === 0) return;
      const timeoutId = setTimeout(() => {
        setMessages(messages.filter(shouldStay(Date.now())));
      }, nextExpire(messages) - Date.now());
      return () => clearTimeout(timeoutId);
    },
    [messages]
  );
  return [messages, message => setMessages([message, ...messages])];
};

export default useMessageToast;
