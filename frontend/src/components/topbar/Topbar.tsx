import React from "react";
import { Search, Chat, Notifications } from "@mui/icons-material";
import "./Topbar.css";
import { Link } from "react-router-dom";

export const Topbar = () => {
  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <span className="logo">Real SNS</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              type="text"
              className="searchInput"
              placeholder="探し物は何ですか?"
            />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarItemIcons">
            <div className="topbarIconItem">
              <Chat />
              <span className="topbaIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbaIconBadge">2</span>
            </div>
            <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
          </div>
        </div>
      </div>
    </>
  );
};
