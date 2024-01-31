import { useContext } from "react";
import ChatContext from "../ChatContext";

export default function ViewProfile() {
  const { receiver, unfriend } = useContext(ChatContext);
  return (
    <div>
      <div
        className="modal fade"
        id="viewProfileModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="viewProfileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="viewProfileModalLabel">
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
            <div className="text-center">
            <p style={{ fontFamily: "Sriracha" }}>
            <i className="fa fa-envelope" aria-hidden="true"></i> : {receiver && receiver.email}
              </p>
              <p style={{ fontFamily: "Sriracha" }}>
              <i className="fa-solid fa-circle-info"></i> : {receiver && receiver.About}
              </p>
            </div>
            </div>

            <div className="modal-footer ">
              <div>
                {receiver && receiver.connectionId && (
                  <button
                    className="btn btn-danger btn-lg "
                    data-bs-toggle="modal"
                    data-bs-target="#unfriendModal"
                    onClick={() =>
                      (document.getElementById("sidebar").style.zIndex = "1")
                    }
                  >
                    <i className="fa-solid fa-trash "></i>
                  </button>
                )}
              </div>
            </div>
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
