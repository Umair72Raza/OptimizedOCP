/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import {
  UserChats,
  chatwitheTeacher,
  newChatwithTeacher,
} from "../../../Apis/ChatRequests";
import { Link, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import StudentConversation from "../StudentConverstion/StudentConversation";
import StudentChatBox from "../StudentChatBox/StudentChatBox";

const StudentChat = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser._id);
  const isAdmin = currentUser && currentUser.role === "Admin";
  const location = useLocation();
  const TeacherId = location.state.teacherId;
  console.log("teacherId: ", TeacherId);

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState([]);
  const [teacherChat, setTeacherChat] = useState(null);
  const [teacherClicked, setTeacherClicked] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const socket = useRef();

  //sending message to the socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current?.on("receive-message", (data) => {
      console.log(data, "data rcvd");
      setReceiveMessage(data);
    });
  }, []);

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", currentUser._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, []);

  //do not remove this console log
  console.log(onlineUsers);

  useEffect(() => {
    const getChats = async () => {
      try {
        const id = currentUser._id;
        const { data } = await UserChats(id); //get user chats with people
        console.log("user chats:  ", data);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, []);

  const getTeacherChat = async () => {
    try {
      const chat = await chatwitheTeacher(TeacherId, currentUser._id);
      console.log(chat.data.chat);
      if (chat.data.chat === null) {
        console.log("I ran");
        const newChat = await newChatwithTeacher(TeacherId, currentUser._id);
        console.log(newChat.data.result);
        setTeacherChat(newChat.data.result);
        setTeacherClicked(true);
      } else {
        console.log(chat.data.chat);
        setTeacherChat(chat.data.chat);
        setTeacherClicked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkChatwithTeacher = async (e) => {
    e.preventDefault();
    const data = await getTeacherChat();
    setShowButton(false);
    console.log(data);
  };

  const checkOnlineStatus = (chat) => {
    const chatMembers = teacherChat?.members.find(
      (member) => member !== currentUser._id
    );
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };

  return (
    <div className="wholeChat" style={{ width: "100%" }}>
      <div className=" " style={{ height: "100vh !important" }}>
        <div className="backgroundPeople d-flex flex-column">
          <h2 style={{ margin: "20px 0px 20px 20px" }}>Chats</h2>
          <>
            {showButton ? (
              <button
                style={{ margin: "20px 20px 20px 20px" }}
                onClick={checkChatwithTeacher}
              >
                Chat with Teacher
              </button>
            ) : null}
          </>
          <div
            className=" mt-5 overflow-auto d-flex flex-column align-items-center vh-100"
            style={{ width: "100%" }}
          >
            {teacherClicked ? (
              <>
                <div
                  className="d-flex "
                  style={{ cursor: "pointer" }}
                  onClick={() => setCurrentChat(teacherChat)}
                >
                  <StudentConversation
                    data={teacherChat}
                    currentUserId={currentUser._id}
                    online={checkOnlineStatus(teacherChat)}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {/* inbox body */}
      <div className="d-flex h-100 " style={{ width: "100%" }}>
        <StudentChatBox
          chat={currentChat}
          currentUser={currentUser._id}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
      </div>
    </div>
  );
};

export default StudentChat;
