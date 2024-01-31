import { useContext } from "react";
import ChatContext from "../../ChatContext";

export default function GroupMemberCard({ name, profilePic,memberId }) {
  const { RemoveGroupMember, receiver } = useContext(ChatContext);
 
  return (
    <div className="card p-2 my-2">
      <div className="row">
        <div className="col col-10 d-flex">
          <img
            className="rounded-circle mt-1"
            width={30}
            height={30}
            src={profilePic}
            alt={`${name}`}
          />
          <p className="mx-2 mt-1" style={{ fontFamily: "Sriracha" }}>
            {name}
          </p>
        </div>
        <div className="col-2">
          <button className="btn btn-danger" style={{ float: "right" }}>
            <i
              className="fa-solid fa-trash "
              onClick={() => RemoveGroupMember(receiver.groupId , memberId)}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
}
