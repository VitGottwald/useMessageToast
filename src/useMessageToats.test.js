import React from "react";
import useMessageToast from "./useMessageToast";
import { render, fireEvent } from "react-testing-library";

function MessageList({ initialMessages = [] }) {
  const [messages, addMessage] = useMessageToast(initialMessages);
  return (
    <div>
      <button onClick={addMessage({ expire: Date.now(), text: "TEXT" })}>
        Add Message
      </button>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

it("Adds a message", () => {
  const { container } = render(MessageList);
  expect(1).toBe(2);
});
