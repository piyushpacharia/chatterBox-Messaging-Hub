import { useContext } from "react";
import ChatContext from "../ChatContext";
import ViewProfile from "./ViewProfile";
import ViewGroupModal from "./GroupChat/ViewGroupModal";

export default function ReceiverCard() {
  const { receiver, unfriend } = useContext(ChatContext);
  return (
    <div
      className=" p-2  "
      style={{
        backgroundColor: "#FAF9F6",
        borderRadius: "1rem",
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
      }}
    >
      <div className="row">
        <div className="col col-6 d-flex ">
          <img
            className="rounded-circle mt-1"
            width={40}
            height={40}
            src={receiver && receiver.profilePic}
          />
          {receiver && receiver.connectionId && (
            <div
            className="receiver-card-name"
            data-bs-toggle="modal"
            data-bs-target="#viewProfileModal"
            onClick={() =>
              (document.getElementById("sidebar").style.zIndex = "1")
            }
          >
            <p
              className="mx-2 mt-1"
              style={{ fontFamily: "Quantico", fontSize: "large" }}
            >
              {receiver && receiver.name}
            </p>
          </div>
          )}
          <ViewProfile />
          {receiver && receiver.groupId && (
            <div
            className="receiver-card-name"
            data-bs-toggle="modal"
            data-bs-target="#ViewGroupModal"
            onClick={() =>
              (document.getElementById("sidebar").style.zIndex = "1")
            }
          >
            <p
              className="mx-2 mt-1"
              style={{ fontFamily: "Quantico", fontSize: "large" }}
            >
              {receiver && receiver.name}
            </p>
          </div>
          )}
          <ViewGroupModal />
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
