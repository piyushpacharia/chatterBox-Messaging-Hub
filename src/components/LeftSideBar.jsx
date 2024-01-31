import UserProfileCard from "./UserProfileCard";
import Friends from "./Friends";
import GroupAuth from "./GroupChat/GroupAuth";
import ManagementBox from "./ManagementBox";

export default function LeftSideBar() {
  return (
    <div className="left-side-bar ">
      <UserProfileCard />
      <div className="container " style={{height:"78%"}}>
        <ManagementBox />
        <Friends />
      
        <GroupAuth  />
      </div>
    </div>
  );
}
