import React from "react";
import ReactDOM from "react-dom";
import useMessageToast from "./useMessageToast";
import "./styles.css";

const TIME_TO_LIVE = 3000;
function App() {
  const [messages, addMessage] = useMessageToast([]);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button
        onClick={() =>
          addMessage({ expires: Date.now() + TIME_TO_LIVE, text: "Blah" })
        }
      >
        Add message
      </button>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg.text + " " + msg.expires}</li>
        ))}
      </ul>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
