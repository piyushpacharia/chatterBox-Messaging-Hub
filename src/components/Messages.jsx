import { useContext, useEffect, useRef, useState } from "react";
import ChatContext from "../ChatContext";

const senderStyles = {
  backgroundColor: "lightpink",
  width: "max-content",
  maxWidth: "55vw",
  padding: 7,
  borderRadius: 10,
  borderBottomRightRadius: 0,
  margin: 10,
};

const receiverStyles = {
  backgroundColor: "lightblue",
  width: "max-content",
  maxWidth: "55vw",
  padding: 7,
  borderRadius: 10,
  borderTopLeftRadius: 0,
  margin: 10,
};

export default function Messages() {
  const { messages, user, deleteMessage } = useContext(ChatContext);
  const [messageToBeDeleted, setmessageToBeDeleted] = useState("");
  const formatTime = (timeString) => {
    const dateObject = new Date(timeString);

    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let period = "am";

    if (hours >= 12) {
      period = "pm";

      if (hours > 12) {
        hours = hours - 12;
      }
    }
    if (hours == 0) hours = 12;

    return `${dateObject.toDateString()} at ${hours}:${minutes}:${period}`;
  };
  const endMessageRef = useRef(null);

  useEffect(() => {
    if (endMessageRef.current) {
      endMessageRef.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <div
      className="p-3 message-bar"
      style={{ overflow: "scroll", overFlow: "auto", height: "75vh" }}
    >
      {messages.map((item, index) => {
        return item.sender == user._id ? (
          <div
            key={index}
            onClick={() => setmessageToBeDeleted(item._id)}
            ref={index == messages.length - 1 ? endMessageRef : null}
          >
            <div style={{ display: "flex", justifyContent: "end" }}>
              <p
                style={senderStyles}
                data-bs-toggle="modal"
                data-bs-target="#deleteMessageModal"
                onClick={() =>
                  (document.getElementById("sidebar").style.zIndex = "-1")
                }
              >
                {item.message}
              </p>
            </div>
            <p
              style={{
                color: "grey",
                fontSize: "12px",
                textAlign: "right",
                marginRight: "10px",
              }}
            >
              {formatTime(item.createdAt)}
            </p>
          </div>
        ) : (
          <div
            key={index}
            ref={index == messages.length - 1 ? endMessageRef : null}
          >
            <div>
              <p style={receiverStyles}>{item.message}</p>
            </div>
            <p
              style={{
                color: "grey",
                fontSize: "12px",
                textAlign: "left",
                marginRight: "10px",
              }}
            >
              {formatTime(item.createdAt)}
            </p>
          </div>
        );
      })}

      <div
        className="modal fade"
        id="deleteMessageModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteMessageModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteMessageModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() =>
                  (document.getElementById("sidebar").style.zIndex = "1")
                }
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are You Sure Want To Delete This Message
              <div>
                <hr />
                <button
                  type="button "
                  className="btn btn-danger "
                  onClick={() => deleteMessage(messageToBeDeleted)}
                  style={{ float: "right" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
