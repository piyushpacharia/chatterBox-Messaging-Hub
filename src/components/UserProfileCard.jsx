import { useContext, useRef } from "react";
import ChatContext from "../ChatContext";
import { toast } from "react-toastify";

export default function UserProfileCard() {
  const { logout, user, BASE_URL, setUser, updateAboutInfo, setUserAbout } =
    useContext(ChatContext);
  const imageRef = useRef();

  const fileChange = (e) => {
    const filetoupload = e.currentTarget.files[0];

    let myFormData = new FormData();
    myFormData.append("profilepic", filetoupload);

    fetch(`${BASE_URL}/auth/upload/profile-pic`, {
      method: "POST",
      headers: {
        Authorization: user.token,
      },
      body: myFormData,
    })
      .then((res) => res.json())
      .then((data) => {
        // set the new data in local storage
        localStorage.setItem(
          "chatterboxuser",
          JSON.stringify({ ...user, profilePic: data.profilePic })
        );
        setUser({ ...user, profilePic: data.profilePic });
        toast.success("Profile Picture Updated Successfully");
      })
      .catch((err) => toast.error("Failed To Upload the file" + err.message));
  };
  return (
    <div className="card p-2 " style={{ width: "100%", borderRadius: 0 }}>
      <div className="row ">
        <div className="col col-8 d-flex ">
          <input
            type="file"
            onChange={fileChange}
            ref={imageRef}
            style={{ display: "none" }}
            accept="image/png , image/jpeg , image/jpg"
          />
          <img
            onClick={() => imageRef.current.click()}
            className="rounded-circle mt-1"
            width={30}
            height={30}
            src={user && user.profilePic}
          />
          <div>
            <div style={{ width: "8rem" }}>
              <p
                className="mx-2 mt-1  text-center"
                style={{ fontFamily: "Quantico", fontSize: "large" }}
              >
                {user && user.name}
              </p>
            </div>
          </div>
        </div>
        <div className="col col-4 ">
          <button onClick={logout} className="btn btn-sm btn-warning">
            Logout
          </button>
        </div>
        <div className="d-flex justify-content-between align-items-center ">
          <p style={{ fontFamily: "Quantico" }}>{user && user.About}</p>
          <button
            type="button"
            className=""
            data-bs-toggle="modal"
            data-bs-target="#editAbout"
            style={{ background: "none", border: "none", float: "right" }}
          >
            <i className="fas fa-edit "></i>
          </button>
        </div>
        <div
          className="modal fade"
          id="editAbout"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="editAboutLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editAboutLabel">
                  Edit About Info
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
                <input
                  type="text"
                  className="form-control"
                  placeholder="Update About Info"
                  onChange={(e) => setUserAbout(e.currentTarget.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={updateAboutInfo}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
