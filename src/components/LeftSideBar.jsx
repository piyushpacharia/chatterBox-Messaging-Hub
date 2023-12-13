import UserProfileCard from "./UserProfileCard";
import Friends from "./Friends";
import Logo from "./Logo";

export default function LeftSideBar() {
  return (
    <div className="left-side-bar" style={{ padding: 0 }}>
      <Logo />
      <UserProfileCard />
      <Friends />
    </div>
  );
}
