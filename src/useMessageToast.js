import { useState, useEffect } from "react";

const shouldDelete = now => message => now > message.expires;
const shouldStay = now => message => !shouldDelete(now)(message);
const nextExpire = messages =>
  messages.map(message => message.expires).sort((a, b) => a - b)[0];

const useMessageToast = (initialMessages, now = Date.now) => {
  const [messages, setMessages] = useState(initialMessages);
  useEffect(
    () => {
      if (messages.length === 0) return;
      const timeoutId = setTimeout(() => {
        setMessages(messages.filter(shouldStay(now())));
      }, nextExpire(messages) - now());
      return () => clearTimeout(timeoutId);
    },
    [messages]
  );
  return [messages, message => setMessages([...messages, message])];
};

export default useMessageToast;
