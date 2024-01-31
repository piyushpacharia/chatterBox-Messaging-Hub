import { useContext, useState } from "react";
import ChatContext from "../../ChatContext";
import { Link } from "react-router-dom";
import AddCard from "./AddCard";

export default function ViewGroupModal() {
  const { receiver, deleteGroup, acceptedRequests, user, AddGroupMembers } =
    useContext(ChatContext);
  const [addMembers, setAddMembers] = useState([]);
  // console.log(addMembers)
  return (
    <div>
      <div
        className="modal fade"
        id="ViewGroupModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ViewGroupModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ViewGroupModalLabel">
                {receiver && receiver.name}
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
            <div className="modal-body ">
              <div className="border  d-flex justify-content-center">
                <img
                  style={{ width: "20vw" }}
                  src={receiver && receiver.profilePic}
                  alt=""
                />
              </div>
              <p style={{ fontFamily: "Sriracha" }}>
                {receiver && receiver.email}
              </p>
              <p style={{ fontFamily: "Sriracha" }}>
                {receiver && receiver.About}
              </p>
            </div>

            <div className="modal-footer ">
              {/* when relates with groups */}
              <div>
                {receiver && receiver.groupId && (
                  <div>
                    <button
                      className="btn btn-lg"
                      data-bs-toggle="modal"
                      data-bs-target="#addMemberModal"
                    >
                      {" "}
                      <i className="fa-solid fa-user-plus"></i>
                    </button>
                    <button
                      className="btn btn-lg"
                     
                    >
                      <Link to="/group-members">
                        <i className="fas fa-users "></i>
                      </Link>
                    </button>
                   
                      <button
                        className="btn btn-danger btn-lg"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteGroupModal"
                      >
                        {" "}
                        <i className="fa-solid fa-trash "></i>
                      </button>
                    </div>
                
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

{/* add group member modal */}
      <div
        className="modal fade"
        id="addMemberModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addMemberModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addMemberModalLabel">
                Add Members
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
                        console.log(checked);
                        if (checked) {
                          setAddMembers((prev) => [...prev, id]);
                        } else {
                          setAddMembers((prev) =>
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
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => AddGroupMembers(receiver.groupId, addMembers)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

{/* delete group Modal */}

<div
        className="modal fade"
        id="deleteGroupModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteGroupModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteGroupModalLabel">
                Delete Group
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
              <p>Are You Sure Want To Delete This Group ?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger btn-lg"
                onClick={() => deleteGroup(receiver.groupId)}
              >
                <i className="fa-solid fa-trash "></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
