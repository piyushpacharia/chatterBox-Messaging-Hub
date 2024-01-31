import { useContext, useState } from "react";
import ChatContext from "../ChatContext";

export default function SendBox() {
  const [oneToOneMessage, setOneToOneMessage] = useState("");
  const [groupMessage, setGroupMessage] = useState("");

  const { sendMessage, sendMessageInGroup, receiver } = useContext(ChatContext);

  return (
    <>
    <form>
    <div
      className="d-flex justify-content-evenly mt-1 p-2  "
      style={{
        position: "absolute",
        bottom: "0px",
        width: "100%",
        backgroundColor: "#d5d5d5",
        borderBottomRightRadius: "1rem",
        borderBottomLeftRadius: "1rem"
      }}
    >
      {receiver && receiver.connectionId && (
        <>
          
          <input
            className="border-0 px-2"
            value={oneToOneMessage}
            style={{ outline: "none", width: "90%", borderRadius: 5 }}
            placeholder="Type your Message"
            onChange={(e) => setOneToOneMessage(e.currentTarget.value)}
          />
          <button
            className="btn msg-btn btn-sm"
            onClick={(e) => {
              e.preventDefault();
              sendMessage(oneToOneMessage);
              setOneToOneMessage("");
            }}
          >
            Send
          </button>
         
        </>
      )}
      {receiver && receiver.groupId && (
        <>
          <input
            className="border-0 px-2"
            value={groupMessage}
            style={{ outline: "none", width: "90%", borderRadius: 5 }}
            placeholder="Type your Message"
            onChange={(e) => setGroupMessage(e.currentTarget.value)}
          />
          <button
            className="btn msg-btn btn-sm"
            onClick={(e) => {
              e.preventDefault();
              sendMessageInGroup(receiver.groupId, groupMessage);
              setGroupMessage("");
            }}
          >
            Send
          </button>
        </>
      )}
    </div>
    </form>
    </>
  );
}
