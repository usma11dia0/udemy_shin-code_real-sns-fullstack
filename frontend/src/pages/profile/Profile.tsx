/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState, memo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Rightbar } from "../../components/rightbar/Rightbar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { TimeLine } from "../../components/timeline/TimeLine";
import { Topbar } from "../../components/topbar/Topbar";
import { TUser } from "../../types/api/users";
import "./Profile.css";

export const Profile = memo(() => {
  const [user, setUser] = useState<TUser>();
  const username = useParams().username;
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get<TUser>(`/users?username=${username}`);
      setUser(response.data);
    };
    fetchUser();
  }, []);
  
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  !user
                    ? PUBLIC_FOLDER + "assets/post/3.jpeg"
                    : !user.coverPicture
                    ? PUBLIC_FOLDER + "assets/post/3.jpeg"
                    : user.coverPicture
                }
                alt=""
                className="profileCoverImg"
              />
              <img
                src={
                  !user
                    ? PUBLIC_FOLDER + "assets/person/noAvatar.png"
                    : !user.profilePicture
                    ? PUBLIC_FOLDER + "assets/person/noAvatar.png"
                    : user.profilePicture
                }
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user?.username}</h4>
              <span className="profileInfoDesc">{user?.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <TimeLine username={user?.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
});
