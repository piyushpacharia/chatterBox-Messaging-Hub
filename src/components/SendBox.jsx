import { useContext, useState } from "react";
import ChatContext from "../ChatContext";

export default function SendBox() {
  const [message, setMessage] = useState("");

  const { sendMessage } = useContext(ChatContext);
  return (
    <div
      className="d-flex justify-content-evenly mt-1 p-2  "
      style={{
        position: "absolute",
        bottom: "0px",
        width: "100%",
        backgroundColor: "#d5d5d5",
        borderBottomRightRadius:"1rem",
        borderBottomLeftRadius:"1rem"
      }}
    >
      <input
        className="border-0 px-2"
        value={message}
        style={{ outline: "none", width: "90%", borderRadius: 5 }}
        placeholder="Type your Message"
        onChange={(e) => setMessage(e.currentTarget.value)}
      />
      <button
        className="btn btn-primary btn-sm"
        onClick={() => {
          sendMessage(message);
          setMessage("");
        }}
      >
        Send
      </button>
    </div>
  );
}
