import { useContext, useState } from "react";
import Model from "./Model";
import PendingRequest from "./PendingRequest";
import ChatContext from "../ChatContext";
export default function ManagementBox() {
  const { pendingRequest, searchFriendsAndGroups, } = useContext(ChatContext);
  const [query, setQuery]=useState("")
  return (
    <div>
      <div className="management-box">
        <button
          type="button "
          className="btn "
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <i className="fa fa-user-plus" aria-hidden="true"></i>
        </button>

        <button
          type="button "
          className="btn"
          data-bs-toggle="modal"
          data-bs-target="#createGroup"
        >
          <i className="fa-solid fa-user-group"></i>
        </button>

        <button
          type="button "
          className="btn"
          data-bs-toggle="modal"
          data-bs-target="#pendingdiv"
        >
          <i className="fa-solid fa-clock"></i> {pendingRequest.length}
        </button>
        <Model />
        <PendingRequest />

        <button
          className="btn"
          data-bs-toggle="modal"
          data-bs-target="#searchFriends-Groups"
        >
          <i className="fas fa-search"></i>
        </button>
      </div>
      {/* search friends and group modal */}

      <div
        className="modal fade"
        id="searchFriends-Groups"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="searchFriends-GroupsLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="searchFriends-GroupsLabel">
                Search Friends & Groups
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={()=>{setQuery("");console.log("done")}}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body d-flex">
              <input
                type="search"
                className="form-control"
                placeholder="Friends Or Group Name"
                value={query}
                onChange={(e)=>setQuery(e.currentTarget.value)}
              />{" "}
              <button type="button" className="btn " onClick={()=>searchFriendsAndGroups(query)}>
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
