import { useState, useEffect } from "react";

const not = fn => x => !fn(x);
const expired = now => message => now > message.expires;
const nextExpire = messages =>
  messages.map(message => message.expires).sort((a, b) => a - b)[0];

const useMessageToast = (initialMessages, now = Date.now) => {
  const [messages, setMessages] = useState(initialMessages);
  useEffect(
    () => {
      if (messages.length === 0) return;
      const timeoutId = setTimeout(() => {
        setMessages(messages.filter(not(expired(now()))));
      }, nextExpire(messages) - now());
      return () => clearTimeout(timeoutId);
    },
    [messages]
  );
  const addMessage = message => {
    console.log(message);
    setMessages([...messages, message]);
  };
  return [messages, addMessage];
};

export default useMessageToast;
