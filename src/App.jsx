import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Route, Routes, useNavigate } from "react-router-dom";
import ChatContext from "./ChatContext";
import ForgetPassword from "./components/ForgetPassword";
import ForgetPasswordInput from "./components/ForgetPasswordInput";
import GroupMembers from "./components/GroupChat/GroupMembers";
import io from "socket.io-client";
const Endpoint = process.env.ENDPOINT;
var socket = io(Endpoint);

export default function App() {
  const [user, setUser] = useState(null);
  const [pendingRequest, setPendingRequest] = useState([]);
  const [acceptedRequests, setAcceptedRequest] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [receiver, setReceiver] = useState();
  const [messages, setMessages] = useState([]);
  const [userAbout, setUserAbout] = useState("");
  const [allGroups, setAllGroups] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupMessages, setGroupMessages] = useState([]);
  const [searchResultsFriends, setSearchResultsFriends] = useState([]);
  const [searchResultsGroups, setSearchResultsGroups] = useState([]);
  // const [groupProfileImage , setGroupProfilerImage] = useState("")

  const BASE_URL = import.meta.env.VITE_DATABASE_URL;
  const navigate = useNavigate();

  // authentication
  const login = (email, password) => {
    fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        } else {
          setUser(data);
          toast.success("Logged In Successfully");
          localStorage.setItem("chatterboxuser", JSON.stringify(data));
          navigate("/home");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const signup = (email, password, name) => {
    fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const logout = () => {
    setUser(null);
    localStorage.clear("chatterboxuser");
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("chatterboxuser")) {
      setUser(JSON.parse(localStorage.getItem("chatterboxuser")));
      navigate("/home");
    }
  }, []);

  // handle friend requests
  const fetchPendingRequest = () => {
    fetch(`${BASE_URL}/friends/all-pending`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          setPendingRequest(data.friends);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const fetchAcceptedRequests = () => {
    fetch(`${BASE_URL}/friends/all-friends`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          setAcceptedRequest(data.friends);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const searchFriends = (query) => {
    fetch(`${BASE_URL}/friends/search-friend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        }
        if (data.users == "") {
          toast.error("no users found");
        } else {
          setSearchResults(data.users);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const handleAcceptRequest = (docid) => {
    fetch(`${BASE_URL}/friends/accept-request/${docid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        } else {
          fetchPendingRequest();
          toast.success("Request Accepted");
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const handleRejectRequest = (docid) => {
    fetch(`${BASE_URL}/friends/reject-request/${docid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        } else {
          fetchPendingRequest();
          fetchAcceptedRequests();
          toast.success("Request Rejected");
        }
      })
      .catch((err) => toast.error(err.message));
  };
  const unfriend = (docid) => {
    fetch(`${BASE_URL}/friends/unfriend/${docid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        } else {
          toast.success("Unfriend Successfully");
        }
      });
  };

  //handle one to one messages
  const sendMessage = (message) => {
    if (message.length == 0) return;

    fetch(`${BASE_URL}/messages/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({
        message,
        receiver: receiver.receiverId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const fetchMessages = () => {
    fetch(
      `${BASE_URL}/messages/get-message/${receiver && receiver.receiverId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.err(data.message);
        } else {
          setMessages(data.messages);
        }
      })
      .catch((err) => console.log(err.message));
  };
  const deleteMessage = (messageId) => {
    fetch(`${BASE_URL}/messages/delete-message/${messageId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          fetchMessages();
          toast.success("Message Deleted");
        } else {
          toast.error(data.message);
        }
      });
  };

  //handle personal info
  const updateAboutInfo = () => {
    fetch(`${BASE_URL}/auth/update-user-about`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({ aboutInfo: userAbout }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          toast.success(data.message);
          fetchUserAbout();
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating about info:", error);
      });
  };

  const fetchUserAbout = () => {
    return fetch(`${BASE_URL}/auth/get-user-about`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          setUserAbout(data.message);
        } else {
          toast.error(data.message);
        }
        return data;
      })
      .catch((error) => {
        console.error("Error fetching user about info:", error);
      });
  };

  //handle group
  const CreateGroup = (groupName, groupMembers) => {
    fetch(`${BASE_URL}/group/create-group`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({ groupName, groupMembers }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          toast.error(data.message);
        } else {
          toast.success("Group Created Successfully");
          fetchAllGroups();
        }
      })
      .catch((error) => {
        toast.error("Error in API call: ", error);
      });
  };

  const fetchAllGroups = () => {
    if (!user || !user.token) {
      toast.error("User or user token is null or undefined");
      return;
    }

    fetch(`${BASE_URL}/group/all-groups`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          toast.error("Failed to fetch groups");
        } else {
          setAllGroups(data.allGroups);
        }
      })
      .catch((error) => {
        toast.error("Error fetching groups " + error.message);
      });
  };

  const deleteGroup = (groupId) => {
    fetch(`${BASE_URL}/group/delete-group/${groupId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        } else {
          toast.success("Group Deleted Successful");
          fetchAllGroups();
        }
      });
  };
  const AddGroupMembers = (groupId, groupMembers) => {
    fetch(`${BASE_URL}/group/add-members/${groupId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({ groupMembers }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
          fetchGroupMembers(groupId);
        }
      });
  };
  const RemoveGroupMember = (groupId, memberId) => {
    fetch(`${BASE_URL}/group/remove-member/${groupId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({ memberId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
          fetchGroupMembers();
        }
      })
      .catch((error) => {
        console.error("Error removing group member:", error);
      });
  };
  const fetchGroupMembers = () => {
    fetch(`${BASE_URL}/group/group-members/${receiver.groupId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          toast.error("cannot fetch");
        } else {
          setGroupMembers(data.allMembers.groupMembers);
        }
      })
      .catch((error) => {
        console.error("Error fetching group members: ", error);
      });
  };

  const imageUpload = (file, groupId) => {
    const formData = new FormData();
    formData.append("groupprofilepic", file);

    fetch(`${BASE_URL}/group/upload-group-profilePic/${groupId}`, {
      method: "POST",
      headers: {
        Authorization: user.token,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Group profile picture uploaded successfully.");
          fetchAllGroups();
        } else {
          toast.error(
            data.message || "Failed to upload group profile picture."
          );
        }
      })
      .catch((error) => {
        console.error("Error uploading group profile picture:", error);
        toast.error("An error occurred while uploading group profile picture.");
      });
  };

  //handle groupChats
  const fetchGroupMessages = (groupId) => {
    fetch(`${BASE_URL}/group-messages/fetch-message/${groupId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error("cannot fetch");
        } else {
          setGroupMessages(data.message);
        }
      });
  };
  const sendMessageInGroup = (groupId, message) => {
    fetch(`${BASE_URL}/group-messages/send-message/${groupId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error("Cannot send message: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        toast.error("Error sending message");
      });
  };

  const deleteGroupMessage = (groupId, messageId) => {
    fetch(
      `${BASE_URL}/group-messages/delete-group-message/${groupId}/${messageId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          toast.success("Message Deleted");
          fetchGroupMessages(groupId);
        } else {
          toast.error(data.message);
        }
      });
  };
  const searchFriendsAndGroups = (query) => {
    if (!user || !user.token) {
      console.error("User or user token is null or undefined");
      return;
    }
    fetch(`${BASE_URL}/friends/friends-groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        } else {
          setSearchResultsGroups(data.groups);
          setSearchResultsFriends(data.users);
        }
      });
  };

  // initializing sockets
  useEffect(() => {
    if (receiver && receiver.connectionId) {
      socket.emit("join-chat", receiver.connectionId);
    } else if (receiver && receiver.groupId) {
      socket.emit("join-chat", receiver.groupId);
    }
  }, [socket, receiver]);

  useEffect(() => {
    if (user) {
      socket.emit("setup-user", user);

      socket.on("new-message", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      socket.on("new-group-message", (newMessage) => {
        setGroupMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      socket.on("pending-request", (data) => {
        setPendingRequest((prev) => [...prev, data]);
      });

      socket.on("accept-friend-request", (acceptedFriend) => {
        setAcceptedRequest((prev) => [...prev, acceptedFriend]);
      });

      socket.on("unfriend-friend", (data) => {
        setAcceptedRequest((prev) =>
          prev.filter((friend) => friend.connectionId !== data.connectionId)
        );
      });
    }
  }, [user]);

  // when user is coming first time so fetch pending and accepted requests
  useEffect(() => {
    if (user) {
      fetchPendingRequest();
      fetchAcceptedRequests();
    }
  }, [user]);

  useEffect(() => {
    if (acceptedRequests.length > 0) {
      const connectionId = acceptedRequests[0].connectionId;
      const name =
        user._id == acceptedRequests[0].sender._id
          ? acceptedRequests[0].receiver.name
          : acceptedRequests[0].sender.name;
      const receiverId =
        acceptedRequests[0].sender._id == user._id
          ? acceptedRequests[0].receiver._id
          : acceptedRequests[0].sender._id;

      const profilePic =
        acceptedRequests[0].sender._id == user._id
          ? acceptedRequests[0].receiver.profilePic
          : acceptedRequests[0].sender.profilePic;

      const email =
        acceptedRequests[0].sender._id == user._id
          ? acceptedRequests[0].receiver.email
          : acceptedRequests[0].sender.email;

      const About =
        acceptedRequests[0].sender._id == user._id
          ? acceptedRequests[0].receiver.About
          : acceptedRequests[0].sender.About;

      setReceiver({ connectionId, name, receiverId, profilePic, email, About });
    }
  }, [acceptedRequests]);

  //fetch all the message when the receiver state is changed

  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [receiver, user]);

  return (
    <div className="main-div">
      <ChatContext.Provider
        value={{
          login,
          signup,
          logout,
          user,
          searchFriends,
          searchResults,
          fetchPendingRequest,
          BASE_URL,
          fetchAcceptedRequests,
          pendingRequest,
          acceptedRequests,
          handleAcceptRequest,
          handleRejectRequest,
          receiver,
          setReceiver,
          sendMessage,
          fetchMessages,
          messages,
          setUser,
          unfriend,
          updateAboutInfo,
          fetchUserAbout,
          userAbout,
          setUserAbout,
          deleteMessage,
          CreateGroup,
          deleteGroup,
          fetchAllGroups,
          AddGroupMembers,
          fetchGroupMembers,
          allGroups,
          RemoveGroupMember,
          groupMembers,
          setGroupMembers,
          fetchGroupMessages,
          groupMessages,
          sendMessageInGroup,
          deleteGroupMessage,
          searchFriendsAndGroups,
          searchResultsFriends,
          searchResultsGroups,
          imageUpload,
        }}
      >
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route
            path="/forget-password/set-password/:token"
            element={<ForgetPasswordInput />}
          />
          <Route path="/group-members" element={<GroupMembers />} />
        </Routes>
      </ChatContext.Provider>
    </div>
  );
}
