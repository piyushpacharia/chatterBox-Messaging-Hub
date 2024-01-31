import { useContext } from "react";
import Messages from "./Messages";
import ReceiverCard from "./ReceiverCard";
import SendBox from "./SendBox";
import ChatContext from "../ChatContext";
import GroupMessages from "./GroupChat/GroupMessages";

const RightSideBar = () => {
  const { receiver } = useContext(ChatContext);
  return (
    <div
      className="col col-9 right-sidebar"
      style={{
        border: "1px solid #d5d5d5",
        borderRadius: "1rem",
        padding: 0,
        position: "relative",
        width: "100%",
        height: "86vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ReceiverCard />
      {receiver && receiver.connectionId && <Messages />}
      {receiver && receiver.groupId && <GroupMessages />}
      <SendBox />
    </div>
  );
};

export default RightSideBar;
