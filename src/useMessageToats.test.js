import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import useMessageToast from "./useMessageToast";
// import { render, fireEvent } from "react-testing-library";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

function MessageList({ initialMessages = [] }) {
  const [messages, addMessage] = useMessageToast([], () => 0);
  return (
    <div>
      <button onClick={addMessage({ expire: 0, text: "TEXT" })}>
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
  act(() => {
    ReactDOM.render(<MessageList />, container);
  });
  const button = container.querySelector("button");

  expect(1).toEqual(button);
});
