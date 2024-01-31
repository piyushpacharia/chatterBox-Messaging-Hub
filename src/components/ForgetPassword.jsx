import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ChatContext from "../ChatContext";
import { toast } from "react-toastify";
import Logo from "./Logo";
import forget from "./images/forget.png"
export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const { BASE_URL } = useContext(ChatContext);
  const ForgetPassword = () => {
    fetch(`${BASE_URL}/auth/forget-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
        }
      })
      .catch((err) => console.log("Error ", err.message));
  };
  return (
    <>
      <div className="d-flex justify-content-center  ">
        <Logo />
      </div>
      <div className="d-flex justify-content-center mt-5 ">
        <div className="mt-5 row text-center" style={{width:"100vw"}}>
          <div className="col-md-9 col-lg-6 col-xl-5">
<img src={forget} width={250} />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 d-inline justify-content-center "  >
         <form>
            <h2 className="mb-3  me-3">Forget Password</h2>
            <div className="form-outline mb-4">
            
            <input
              type="email"
              className="form-control form-control-lg"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
              </div>
          
          <br />
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={ForgetPassword}
            >
              Submit
            </button>
          </div>
          <Link to="/">Back To Login</Link>
          </form>
          </div>
        </div>

      
      </div>
    </>
  );
}
