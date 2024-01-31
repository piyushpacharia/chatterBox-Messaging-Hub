import { useContext, useEffect, useState } from "react";
import ChatContext from "../../ChatContext";
import AddCard from "./AddCard";
// import { toast } from "react-toastify";
import GroupCard from "./GroupCard";
// import ViewGroupModal from "./ViewGroupModal";

export default function GroupAuth() {
  const {
    acceptedRequests,
    user,
    allGroups,
    CreateGroup,
    fetchAllGroups,
    searchResultsGroups,
  } = useContext(ChatContext);
  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);

  // console.log(allGroups)

  useEffect(() => {
    if (user) {
      fetchAllGroups();
    }
  }, [user]);
  return (
    <div className="group-box">
      <h6 className="text-center">
        Groups <span>({allGroups.length})</span>
      </h6>
      {/* create group modal */}
      <div
        className="modal fade"
        id="createGroup"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="createGroupLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createGroupLabel">
                Create Group
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                {/* <input type="file"/> */}
                <input
                  type="text"
                  className="form-control"
                  id=""
                  aria-describedby="emailHelp"
                  placeholder="Group Name"
                  onChange={(e) => setGroupName(e.currentTarget.value)}
                />
              </div>
              <h4>Your Friends</h4>
              <div className="form-group d-grid justify-content-center">
                {acceptedRequests.map((item, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={`checkbox-${index}`}
                      value={
                        item.sender._id === user._id
                          ? item.receiver._id
                          : item.sender._id
                      }
                      onChange={(e) => {
                        const id = e.currentTarget.value;
                        const checked = e.currentTarget.checked;
                        if (checked) {
                          setGroupMembers((prev) => [...prev, id]);
                        } else {
                          setGroupMembers((prev) =>
                            prev.filter((item) => item !== id)
                          );
                        }
                      }}
                    />
                    <label htmlFor={`checkbox-${index}`}>
                      <AddCard
                        name={
                          item.sender._id === user._id
                            ? item.receiver.name
                            : item.sender.name
                        }
                        receiverId={
                          item.sender._id === user._id
                            ? item.receiver._id
                            : item.sender._id
                        }
                        profilePic={
                          item.sender._id === user._id
                            ? item.receiver.profilePic
                            : item.sender.profilePic
                        }
                      />
                    </label>
                  </div>
                ))}
              </div>

              <div>
                <button
                  type="submit"
                  className="btn btn-primary mt-2"
                  style={{ float: "right" }}
                  onClick={() => CreateGroup(groupName, groupMembers)}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>

      {!searchResultsGroups.length ? (
        <div className="p-2">
          {allGroups.map((group) => (
            <GroupCard
              key={group._id}
              groupName={group.groupName}
              groupImage={group.groupImage}
              groupId={group._id}
            />
          ))}
        </div>
      ) : (
        <div className="p-2">
          {searchResultsGroups.map((group) => (
            <GroupCard
              key={group._id}
              groupName={group.groupName}
              groupImage={group.groupImage}
              groupId={group._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
