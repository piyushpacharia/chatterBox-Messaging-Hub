import React from "react";

export default function AddCard({ name, profilePic }) {
  return (
    <div className="" style={{ display: "flex", justifyContent: "center" }}>
      
      <div
        className=" mt-2 "
        style={{
          display: "flex",
          borderBottom:"1px solid black",
          borderRadius:"0.5rem",
          marginLeft:"0.2rem",
          fontFamily: "Sriracha",
          alignItems:"center",
          width: "20rem",
          height:"4rem"
        }}
      >
        <div className="mx-2">
          <img width={50} height={50} src={profilePic} alt="" style={{borderRadius:"50%"}}/>
        </div>
        <div className="mx-2">{name}</div>
      </div>
    </div>
  );
}
