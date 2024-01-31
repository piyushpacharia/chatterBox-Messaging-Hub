import { useContext } from "react";
import FriendCard from "./FriendCard";
import ChatContext from "../ChatContext";

export default function Friends() {
  const {  acceptedRequests, user ,searchResultsFriends} = useContext(ChatContext);
  return (
    <>
     <div className="friend-box">
     <h6 className="text-center">Friends <span>({acceptedRequests.length})</span></h6>
      <div className="p-2">
        
       {!searchResultsFriends.length ? (
         <div>
         {acceptedRequests.map((item, index) => (
           <FriendCard
             key={index}
             name={
               item.sender._id == user._id
                 ? item.receiver.name
                 : item.sender.name
             }
             receiverId={
               item.sender._id == user._id
                 ? item.receiver._id
                 : item.sender._id
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
       ) : (
<div>
          { searchResultsFriends.map((item , index)=>(
              <FriendCard
             key={index}  
             name={
              item.sender._id == user._id
                ? item.receiver.name
                : item.sender.name
            }
            receiverId={
              item.sender._id == user._id
                ? item.receiver._id
                : item.sender._id
            }
            profilePic={
              item.sender._id == user._id
                ? item.receiver.profilePic
                : item.sender.profilePic
            }
            connectionId={item.connectionId}
           
             />
            
          ))}
          
        </div>
       )}
        
        <div></div>
      </div>
     </div>
    </>
  );
}
