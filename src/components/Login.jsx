import { useContext, useState } from "react";
import ChatContext from "../ChatContext";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import LoginImage from "./images/loginImage.svg";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(ChatContext);
  return (
    <>
      <div className="d-flex justify-content-center border">
        <Logo />
      </div>
      <section className="vh-100 d-flex align-items-center">
        <div className="container-fluid h-custom ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src={LoginImage} className="img-fluid" alt="Sample image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <h3 className="mb-3  me-3" style={{ fontFamily: "sans-serif" }}>
                  Let's do some Talk !
                </h3>

                {/* Email input */}
                <div className="form-outline mb-4">
                  <input
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter your email address"
                  />
                  <label className="form-label" htmlFor="form3Example3"></label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                  />
                  <label className="form-label" htmlFor="form3Example4"></label>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-center text-lg-start ">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                      onClick={() => login(email, password)}
                    >
                      Login
                    </button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Don't have an account?{" "}
                      <Link to="/register" className="link-danger">
                        Register
                      </Link>
                    </p>
                  </div>
                  <a className="text-body">
                    <Link to="/forget-password">Forgot password?</Link>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
