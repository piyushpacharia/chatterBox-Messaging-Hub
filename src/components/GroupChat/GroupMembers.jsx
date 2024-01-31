import { Link } from "react-router-dom";
import Logo from "../Logo";
import { useContext, useEffect } from "react";
import ChatContext from "../../ChatContext";
import GroupMemberCard from "./GroupMemberCard";

export default function GroupMembers() {
  const { user, fetchGroupMembers, groupMembers } = useContext(ChatContext);
  // console.log(groupMembers)

  useEffect(() => {
    if (user) {
      fetchGroupMembers();
    }
  }, [user]);
  return (
    <div className="d-flex justify-content-center">
      <div>
        <button className="btn btn-lg">
          <Link to="/home">
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </Link>
        </button>
      </div>
      <div style={{ width: "100%" }}>
        <nav className="navbar navbar-expand px-3 border-bottom ">
          <div style={{ width: "15rem" }}>
            <Logo />
          </div>
        </nav>
        <div className="d-flex justify-content-center mt-2">
          <div style={{ width: "80%" }}>
            <h3
              style={{
                backgroundColor: "darkmagenta",
                color:"white",
                height: "3rem",
                borderRadius: "0.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Group Members
            </h3>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div style={{ width: "80%" }}>
            {groupMembers.map((item, index) => (
              <div key={index}>
                <GroupMemberCard
                  name={item.name}
                  memberId={item._id}
                  profilePic={item.profilePic}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
