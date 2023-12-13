import React from "react";
import logo from "./logos/chatterBox.svg";
export default function Logo() {
  return (
    <div>
      <div className="d-flex" style={{ width: "max-content" }}>
        <img style={{ width: "9rem", marginLeft: "-1rem" }} src={logo} alt="" />
        <h3 className="mt-3" style={{ marginLeft: "-3rem" }}>
          ChatterBox
        </h3>
      </div>
      <div>
        <p
          className="text-end "
          style={{ marginTop: "-1rem", marginLeft: "", fontFamily: "Sriracha" }}
        >
          The Messaging Hub
        </p>
      </div>
    </div>
  );
}
