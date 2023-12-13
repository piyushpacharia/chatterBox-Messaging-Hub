export default function SearchResultCard({
  name,
  email,
  sendRequest,
  friendId,
  profilePic,
}) {
  return (
    <div className="card p-2 my-2" style={{ width: "100%" }}>
      <div className="row ">
        <div
          className="col col-3 "
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            className="rounded-circle mt-1 border"
            width={100}
            height={100}
            src={profilePic}
          />
        </div>
        <div className="col col-6">
          <p
            className="mx-2 mt-1"
            style={{ fontFamily: "Quantico", fontSize: "large" }}
          >
            {name}
          </p>
          <p className="mx-2 mt-1" style={{ fontFamily: "Sriracha" }}>
            {email}
          </p>
        </div>
        <div className="col col-3">
          <button
            onClick={() => sendRequest(friendId)}
            className="btn btn-primary btn-sm mt-4 pt"
          >
            Add Friend
          </button>
        </div>
      </div>
    </div>
  );
}
