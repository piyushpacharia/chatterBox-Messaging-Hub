import { useContext, useEffect, useRef, useState } from "react";
import ChatContext from "../../ChatContext";

//css for sender and receiver
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

export default function GroupMessages() {
  const {
    groupMessages,
    fetchGroupMessages,
    user,
    receiver,
    deleteGroupMessage,
  } = useContext(ChatContext);
  const [messageToBeDeleted, setmessageToBeDeleted] = useState("");

  const endMessageRef = useRef();

  //useEffect for targeting the latest message
  useEffect(() => {
    if (endMessageRef.current) {
      endMessageRef.current.scrollIntoView();
    }
  }, [groupMessages]);

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

  useEffect(() => {
    if (user) {
      fetchGroupMessages(receiver.groupId);
    }
  }, [receiver, user]);
  return (
    <div
      className="p-3 message-bar"
      style={{ overflow: "scroll", overFlow: "auto", height: "75vh" }}
    >
      {groupMessages.map((item, index) => (
        <div key={index}>
          {item.sender &&
            (item.sender._id === user._id ? (
              <div
                style={{ display: "flex", justifyContent: "end" }}
                ref={index === groupMessages.length - 1 ? endMessageRef : null}
                onClick={() => setmessageToBeDeleted(item._id)}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <p
                      style={senderStyles}
                      data-bs-toggle="modal"
                      data-bs-target="#deleteGroupMessage"
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
                    <i>{formatTime(item.createdAt)}</i>
                  </p>
                </div>
              </div>
            ) : (
              <div
                style={{ display: "flex", justifyContent: "start" }}
                ref={index === groupMessages.length - 1 ? endMessageRef : null}
              >
                <div>
                  <div
                    style={{
                      color: "grey",
                      fontSize: "12px",
                      textAlign: "right",
                      marginRight: "10px",
                      display: "inline",
                    }}
                  >
                    <b>{item.sender.name}</b>{" "}
                    <i>{formatTime(item.createdAt)}</i>
                  </div>
                  <div className="d-flex">
                    <div className="d-flex align-items-center">
                      <img
                        width={30}
                        height={30}
                        src={item.sender.profilePic}
                      />
                    </div>
                    <p style={receiverStyles}>{item.message}</p>
                  </div>
                </div>
              </div>
            ))}
          {/* delete message modal */}
          <div>
            <div
              className="modal fade"
              id="deleteGroupMessage"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="deleteGroupMessageLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="deleteGroupMessageLabel">
                      Delete Message
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Are You Sure Want To Delete This Message ?</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                      onClick={() =>
                        deleteGroupMessage(receiver.groupId, messageToBeDeleted)
                      }
                    >
                      delete message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
