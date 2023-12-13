import React, { useContext } from "react";
import ChatContext from "../ChatContext";
import ViewProfile from "./ViewProfile";

export default function ReceiverCard() {
  const { receiver, unfriend } = useContext(ChatContext);
  return (
    <div
      className=" p-2  "
      style={{ backgroundColor: "#FAF9F6", borderRadius: "1rem" }}
    >
      <div className="row">
        <div className="col col-6 d-flex ">
          <img
            className="rounded-circle mt-1"
            width={40}
            height={40}
            src={receiver && receiver.profilePic}
          />
          <p
            className="mx-2 mt-1"
            style={{ fontFamily: "Quantico", fontSize: "large" }}
          >
            {receiver && receiver.name}
          </p>
        </div>
        <div className="col-5"></div>
        <div className="col-1 text-end">
          <div className="btn-group">
            <i
              className="fa fa-ellipsis-v mt-2   text-center"
              aria-hidden="true"
              style={{
                fontSize: "3vh",
                marginRight: "2rem",
                width: "1rem",
                cursor: "pointer",
              }}
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            ></i>

            <div className="dropdown-menu dropdown-menu-right">
              <button
                type="button"
                className="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#unfriendModal"
                onClick={() =>
                  (document.getElementById("sidebar").style.zIndex = "1")
                }
              >
                Unfriend
              </button>

              <button
                type="button"
                className="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#viewProfileModal"
                onClick={() =>
                  (document.getElementById("sidebar").style.zIndex = "1")
                }
              >
                View Profile
              </button>
            </div>
            <ViewProfile />
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="unfriendModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="unfriendModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="unfriendModalLabel">
                Unfriend
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
              <p>Are You Sure Want To Unfriend</p>
              <hr />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => unfriend(receiver.connectionId)}
                data-bs-dismiss="modal"
                style={{ float: "right" }}
              >
                Unfriend
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
