/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect, useRef, useState } from "react";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { getUsers } from "../../../Apis/UserApis";
import { addMessage, getMessages } from "../../../Apis/MessageRequests";
const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();

  useEffect(() => {
    const userId = chat?.members?.find((id) => id != currentUser);
    const getUserData = async () => {
      try {
        const data = await getUsers(userId);
        setUserData(data.data.response[0]);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) {
      getUserData();
    }
  }, [chat]);

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat?._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  useEffect(() => {
    console.log("messages: ", messages);
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        // console.log(data.result);
        setMessages(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) {
      fetchMessages();
    }
  }, [chat]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    // send msg to db
    try {
      const { data } = await addMessage(message);
      console.log(data.result, "data from messages");

      setMessages([...messages, data.result]);

      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
    //send message to socket
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };

  //always scroll to last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="d-flex backgroundInbox " style={{ width: "100%" }}>
        {chat ? (
          <>
            <div
              className="d-flex flex-column chat-header "
              style={{ width: "100%" }}
            >
              <div className="profile-container">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="profile-info d-flex align-items-center">
                    <div className="profile-pic-container">
                      <img
                        className="rounded-circle profile-pic"
                        src={`https://eu.ui-avatars.com/api/?name=${userData?.username
                          .split(" ")
                          .join("+")}&size=50`}
                        alt="profile"
                      />
                      <div className=""></div>
                    </div>
                    <div className="name d-flex">{userData?.username}</div>
                  </div>
                </div>
                <hr />
              </div>

              <div className="chat-body overflow-y-auto vh-100 d-flex flex-column align-items-center justify-content-center">
                {messages?.map((message, index) => (
                  <div
                    key={index}
                    ref={scroll}
                    className={`msg-container ${
                      message.senderId === currentUser
                        ? "msg-sent"
                        : "msg-received"
                    }`}
                  >
                    <span>{message.text}</span>
                    <div className="msg-time">
                      <span>{format(message.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* chat sender */}
              <form onSubmit={handleSend} className="d-flex m-4">
                <InputEmoji value={newMessage} onChange={handleChange} />
                <button type="submit" className="sendbutton btn shadow">
                  Send
                </button>
              </form>
            </div>
          </>
        ) : (
          <span>Tap on a messge to start convo</span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
