import { useContext, useEffect, useRef } from "react";
import ChatContext from "../ChatContext";
import { toast } from "react-toastify";

export default function UserProfileCard() {
  const {
    user,
    BASE_URL,
    setUser,
    updateAboutInfo,
    setUserAbout,
    userAbout,
    fetchUserAbout,
    logout,
  } = useContext(ChatContext);
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
  
  useEffect(() => {
    if (user) {
      fetchUserAbout();
    }
  }, [user]);
  return (
    <div
      className=" d-flex text-center p-1 my-1 "
      style={{ width: "100%", borderBottom: " 1px solid black" }}
    >
      <div className="" style={{ width: "100%" }}>
        <div className=" d-flex ">
          <input
            type="file"
            onChange={fileChange}
            ref={imageRef}
            style={{ display: "none" }}
            accept="image/png , image/jpeg , image/jpg"
          />
          <img
            onClick={() => imageRef.current.click()}
            className="rounded-circle mt-1 "
            style={{ boxShadow: "1px 1px 3px 2px grey" }}
            width={60}
            height={60}
            src={user && user.profilePic}
          />
          <div className="d-flex " style={{ width: "100%" }}>
            <div style={{ width: "100%" }}>
              <p
                className="mx-2 mt-1  text-center"
                style={{ fontFamily: "Quantico", fontSize: "large" }}
              >
                {user && user.name}
              </p>
            </div>
            <div>
              <button
                onClick={logout}
                className="btn btn-sm btn-warning mt-2"
                style={{ float: "right" }}
              >
                <i className="fa fa-sign-out" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <div>
            <p className="px-2" style={{ fontFamily: "Quantico" }}>
              {" "}
              <i className="fa-solid fa-circle-info"></i> : {userAbout}
            </p>
          </div>
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
