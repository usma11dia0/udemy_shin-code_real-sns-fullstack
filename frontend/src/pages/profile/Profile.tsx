import React, { useEffect, useState, memo } from "react";
import axios from "axios";

import { Rightbar } from "../../components/rightbar/Rightbar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { TimeLine } from "../../components/timeline/TimeLine";
import { Topbar } from "../../components/topbar/Topbar";
import { TUser } from "../../types/api/users";
import "./Profile.css";

export const Profile = memo(() => {
  const [user, setUser] = useState<TUser>();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get<TUser>(`/users?username=shincode`);
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
                src="/assets/post/3.jpeg"
                alt=""
                className="profileCoverImg"
              />
              <img
                src="/assets/person/1.jpeg"
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
            <TimeLine username="shincode" />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
});
