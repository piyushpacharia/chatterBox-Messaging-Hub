import  { useContext } from "react";
import ChatContext from "../../ChatContext";

export default function GroupCard({ groupName, groupImage, groupId }) {
  const { setReceiver } = useContext(ChatContext);
  
  return (
   <div >
     <div
      className="group-card card p-2 my-2"
      onClick={() => {
        setReceiver({ name: groupName, profilePic: groupImage, groupId: groupId });
      }}
    >
      <div className="row">
        <div className="col col-12 d-flex">
          <img
            className="rounded-circle mt-1"
            width={30}
            height={30}
            src={groupImage}
            alt={`${groupName}`}
          />
          <p className="mx-2 mt-1" style={{ fontFamily: "Sriracha" }}>
            {groupName}
          </p>
        </div>
      </div>
    </div>
   </div>
  );
}
