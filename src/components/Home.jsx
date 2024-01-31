import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "../ChatContext";
import "../index.css";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import Logo from "./Logo";

export default function Home() {
  const { user } = useContext(ChatContext);
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    console.log("it works");
  };

  return (
    <div>
      <div className="wrapper">
        <aside id="sidebar" className={isSidebarCollapsed ? "collapsed" : ""}>
          <div className="h-100">
            <div className="sidebar-logo"></div>
            <LeftSideBar />
          </div>
        </aside>
        <div className="main">
          <nav className="navbar navbar-expand px-3 border-bottom ">
            <button
              className="btn glow-on-hover"
              type="button"
              data-bs-theme="dark"
              onClick={toggleSidebar}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div style={{ width: "15rem" }}>
              <Logo />
            </div>
          </nav>
          <main
            className="content px-3 py-2 "
            style={{ width: "auto", overflow: "auto" }}
          >
            <div className="container-fluid">
              <div className="mb-3 d-flex justify-content-center">
                <RightSideBar />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
