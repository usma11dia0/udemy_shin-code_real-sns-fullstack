import React, { memo, useContext } from "react";
import { Analytics, Face, Gif, Image } from "@mui/icons-material";
import "./Share.css";
import { AuthContext } from "../../state/AuthContext";

export const Share = memo(() => {
  const {user} = useContext(AuthContext);
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              !user
                ? "/assets/person/noAvatar.png"
                : !user.profilePicture
                ? "/assets/person/noAvatar.png"
                : user.profilePicture
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            type="test"
            className="shareInput"
            placeholder="今何してるの?"
          />
        </div>
        <hr className="shareHr" />

        <div className="shareButtons">
          <div className="shareOptions">
            <div className="shareOption">
              <Image className="shareIcon" htmlColor="blue" />
              <span className="shareOptionText">写真</span>
            </div>
            <div className="shareOption">
              <Gif className="shareIcon" htmlColor="hotpink" />
              <span className="shareOptionText">GIF</span>
            </div>
            <div className="shareOption">
              <Face className="shareIcon" htmlColor="green" />
              <span className="shareOptionText">気持ち</span>
            </div>
            <div className="shareOption">
              <Analytics className="shareIcon" htmlColor="red" />
              <span className="shareOptionText">投票</span>
            </div>
          </div>
          <button className="shareButton">投稿</button>
        </div>
      </div>
    </div>
  );
});
