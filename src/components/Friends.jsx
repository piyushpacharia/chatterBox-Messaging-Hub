import { useContext } from "react";
import FriendCard from "./FriendCard";
import Model from "./Model";
import PendingRequest from "./PendingRequest";
import ChatContext from "../ChatContext";

export default function Friends() {
  const { pendingRequest, acceptedRequests, user } = useContext(ChatContext);

  return (
    <div className="p-2" style={{ backgroundColor: "lightgrey" }}>
      <button
        type="button "
        className="btn btn-primary btn-sm "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Search a Friend
      </button>

      <button
        type="button "
        className="btn btn-warning btn-sm mx-2"
        data-bs-toggle="modal"
        data-bs-target="#pendingdiv"
      >
        Pending ( {pendingRequest.length} )
      </button>

      <Model />
      <PendingRequest />

      {acceptedRequests.map((item, index) => (
        <FriendCard
          key={index}
          name={
            item.sender._id == user._id ? item.receiver.name : item.sender.name
          }
          receiverId={
            item.sender._id == user._id ? item.receiver._id : item.sender._id
          }
          profilePic={
            item.sender._id == user._id
              ? item.receiver.profilePic
              : item.sender.profilePic
          }
          connectionId={item.connectionId}
          email={
            item.sender._id == user._id
              ? item.receiver.email
              : item.sender.email
          }
          About={
            item.sender._id == user._id
              ? item.receiver.About
              : item.sender.About
          }
        />
      ))}
    </div>
  );
}
