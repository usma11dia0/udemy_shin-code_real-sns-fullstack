import React from "react";
import { Post } from "../post/Post";
import { Share } from "../share/Share";
import { Posts } from "../../dummyData";
import "./TimeLine.css";

export const TimeLine = () => {
  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {Posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};
