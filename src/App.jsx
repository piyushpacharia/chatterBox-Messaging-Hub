import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Route, Routes, useNavigate } from "react-router-dom";
import ChatContext from "./ChatContext";
import Pusher from "pusher-js";
import ForgetPassword from "./components/ForgetPassword";
import ForgetPasswordInput from "./components/ForgetPasswordInput";
// import dotenv from 'dotenv';
// dotenv.config();

export default function App() {
  const [user, setUser] = useState(null);
  const [pendingRequest, setPendingRequest] = useState([]);
  const [acceptedRequests, setAcceptedRequest] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userAbout, setUserAbout] = useState("");
  const BASE_URL = import.meta.env.VITE_DATABASE_URL;
  const navigate = useNavigate();

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
          fetchAcceptedRequests();
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
        if (data.success == false) toast.error(data.message);
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
        if (data.success == false) toast.err(data.message);
        else setMessages(data.messages);
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
    fetch(`${BASE_URL}/auth/get-user-about`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setUserAbout(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching user about info:", error);
      });
  };

  // when user is coming first time so fetch pending and accepted requests
  useEffect(() => {
    if (user) {
      fetchPendingRequest();
      fetchAcceptedRequests();
    }
  }, [user]);

  //subscribe to pusher when website loaded first time
  useEffect(() => {
    let pusher = new Pusher(import.meta.env.VITE_KEY, {
      cluster: import.meta.env.VITE_CLUSTER,
    });
    //1. subscribe the channel
    let channel = pusher.subscribe("chatterbox-channel");
    //2. bind with specific event inside this channel
    channel.bind("message-added", (data) => {
      //check if this data belongs to us
      if (receiver.connectionId == data.messageId) {
        //create a new array in which all the previous elements of array + new data will be there
        setMessages((previousState) => [...previousState, data]);
      }
    });
    //syntax to provide cleanup function
    return () => {
      pusher.unsubscribe("chatterbox-channel");
    };
  }, [receiver]);

  // subscribe to pusher we get updated friend requests
  useEffect(() => {
    let pusher = new Pusher(import.meta.env.VITE_KEY, {
      cluster: import.meta.env.VITE_CLUSTER,
    });
    let channel = pusher.subscribe("chatterbox-channel");
    channel.bind("friend-request", (data) => {
      if (user._id == data.receiver) {
        setPendingRequest((prev) => [...prev, data]);
      }
    });
    channel.bind("friend-request-accepted", (data) => {
      // if the request that we sent and receiver has accepted so we should update in real time
      if (user._id == data.sender._id) {
        setAcceptedRequest((prev) => [...prev, data]);
      }
    });
    return () => {
      pusher.unsubscribe("chatterbox-channel");
    };
  }, [user]);

  //subscribe to unfriend
  useEffect(() => {
    let pusher = new Pusher(import.meta.env.VITE_KEY, {
      cluster: import.meta.env.VITE_CLUSTER,
    });

    let channel = pusher.subscribe("chatterbox-channel");

    channel.bind("unfriend-request", (data) => {
      if (user._id === data.sender._id || user._id === data.receiver._id) {
        fetchAcceptedRequests();
        fetchMessages();
        setReceiver(null);
      }
    });

    return () => {
      pusher.unsubscribe("chatterbox-channel");
    };
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

  //fetch all the message everyTime when the receiver state is changed

  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [receiver, user]);

  return (
    <div>
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
        </Routes>
      </ChatContext.Provider>
    </div>
  );
}
