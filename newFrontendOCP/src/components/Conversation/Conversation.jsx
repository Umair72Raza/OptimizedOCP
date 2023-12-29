/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { getUsers } from "../../Apis/UserApis";
const Conversation = ({ data, currentUserId, online }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members?.find((id) => id != currentUserId);
    // console.log(data.chat.members)
    const getUserData = async () => {
      try {
        const data = await getUsers(userId);
        setUserData(data.data.response[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="chat d-flex">
        <div className="">
          <div className="">
            <div className="cardA  d-flex justify-content-evenly align-items-center ">
              <img
                className="rounded-circle navbar-blue"
                src={`https://eu.ui-avatars.com/api/?name=${userData?.username
                  .split(" ")
                  .join("+")}&size=50`}
                alt="profile"
              />
              {online && <div className="online-dot d-flex"></div>}
              <div className="name d-flex">{userData?.username}</div>
              {/* <span className="offline-font">
                {online ? "Online" : "Offline"}
              </span> */}
            </div>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversation;
