/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { UserChats } from '../../Apis/ChatRequests';
import Conversation from '../Conversation/Conversation';
import ChatBox from '../ChatBox/ChatBox';
import {io} from 'socket.io-client'

const Chat = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isAdmin = currentUser && currentUser.role === "Admin";
  const [chats,setChats] = useState([]);
  const [currentChat,setCurrentChat] = useState(null);
  const [onlineUsers,setOnlineUsers] = useState([]);
  const [sendMessage,setSendMessage] = useState(null);
  const [receiveMessage,setReceiveMessage] = useState([]);
  const socket = useRef();
//sending message to the socket server
  useEffect(()=>{
    if(sendMessage!==null){
      socket.current.emit('send-message',sendMessage)
    }
  },[sendMessage])

  useEffect(()=>{
    socket.current?.on('receive-message',(data)=>{
      console.log(data,"data rcvd")
      setReceiveMessage(data)
    })
  },[])

  useEffect(()=>{
    socket.current = io('http://localhost:8800');
    socket.current.emit("new-user-add",currentUser._id);
    socket.current.on('get-users',(users)=>{
      setOnlineUsers(users);
    })
  },[])

  //do not remove this console log
console.log(onlineUsers)

useEffect(()=>{
  const getChats = async()=>{
    try {
      const id = currentUser._id;
      const {data} =  await UserChats(id) //get user chats with people
      //console.log("user chats:  ",data)
      setChats(data)
    } catch (error) {
      console.log(error);
    }

  }
  getChats();
},[])


  const checkOnlineStatus = (chat) =>{
    const chatMembers = chat.members.find((member)=>member!==currentUser._id);
    const online = onlineUsers.find((user)=>user.userId===chatMembers);
    return online? true:false;

  }

  return (
    <div className='wholeChat backgroundChat' >
      <div className="left-Side-Chat d-flex ">
        <div className="backgroundPeople d-flex flex-column ">
          <h2 className='p-5'>Chats</h2>
          <div className=" mt-5 overflow-auto d-flex flex-column align-items-center vh-100" style={{width:'100%'}}>
          {chats.map((chat) => (
            <div className='d-flex ' style={{cursor:'pointer'}} onClick={()=>setCurrentChat(chat)}>
              <Conversation data={chat} currentUserId={currentUser._id} online={checkOnlineStatus(chat)} />
            </div>
          ))}
          </div>
        </div>
      </div>
      {/* inbox body */}
      <div className='d-flex h-100 'style={{width:'100%'}}>
      <ChatBox chat={currentChat} currentUser={currentUser._id} setSendMessage={setSendMessage} receiveMessage={receiveMessage} />
      </div>
    </div>
  );
}

export default Chat