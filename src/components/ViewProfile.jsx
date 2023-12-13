import { useContext } from "react";
import ChatContext from "../ChatContext";

export default function ViewProfile() {
  const { receiver } = useContext(ChatContext);

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
              <p style={{ fontFamily: "Sriracha" }}>
                {receiver && receiver.email}
              </p>
              <p style={{ fontFamily: "Sriracha" }}>
                {receiver && receiver.About}
              </p>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
