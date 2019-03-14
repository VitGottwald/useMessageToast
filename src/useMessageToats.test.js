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
  const [messages, addMessage] = useMessageToast([]);
  // const addMessage = () => {};
  // const messages = [];
  return (
    <div>
      <button
        onClick={() =>
          addMessage({ expire: 0, text: `Message ${messages.length + 1}` })
        }
      >
        Add Message
      </button>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg.text}</li>
        ))}
      </ul>
    </div>
  );
}

it("Adds a message", () => {
  act(() => {
    ReactDOM.render(<MessageList />, container);
  });
  const l0 = container.querySelector("li");
  expect(l0).toBe(null);

  const button = container.querySelector("button");
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  const l1 = container.querySelector("li");
  expect(l1.textContent).toBe("Message 1");
});
