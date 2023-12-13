import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ChatContext from "../ChatContext";
import { toast } from "react-toastify";
import Logo from "./Logo";
export default function ForgetPasswordInput() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { token } = useParams();
  const { BASE_URL } = useContext(ChatContext);

  const navigate = useNavigate();
  const updatePassword = () => {
    if (password != password2) {
      alert("password are not matching");
      return;
    }
    fetch(`${BASE_URL}/auth/handle-update-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, token }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success == false) {
          alert(data.message);
        } else {
          toast.success("Password Updated Successfully");
          navigate("/");
        }
      })
      .catch((err) => console.log("Error ", err.message));
  };
  return (
    <>
      <div className="d-flex justify-content-center border">
        <Logo />
      </div>
      <div className="d-flex justify-content-center ">
        <div className="mt-5 " style={{ width: "30vw" }}>
          <h3 style={{ fontFamily: "sans-serif" }}>Update Password</h3>
          <div className="form-outline mb-4">
            <input
              onChange={(e) => setPassword(e.currentTarget.value)}
              id="form3Example3"
              className="form-control form-control-lg"
              type="password"
              placeholder="Enter New Password"
            />
          </div>
          <br />
          <div className="form-outline mb-4">
            <input
              onChange={(e) => setPassword2(e.currentTarget.value)}
              className="form-control form-control-lg"
              type="password"
              placeholder="Enter New Password"
            />
          </div>
          <br />
          <button
            className="btn btn-primary"
            onClick={updatePassword}
            style={{ float: "right" }}
          >
            Update Password
          </button>
        </div>
      </div>
    </>
  );
}
