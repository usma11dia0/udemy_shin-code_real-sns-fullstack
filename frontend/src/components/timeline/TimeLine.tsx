import React, { useState, memo, useEffect } from "react";
import axios from "axios";
import { TPost } from "../../types/api/posts";
import { Post } from "../post/Post";
import { Share } from "../share/Share";
// import { Posts } from "../../dummyData";
import "./TimeLine.css";

export const TimeLine = memo(() => {
  const [posts, setPosts] = useState<Array<TPost>>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/posts/timeline/62972757ee8afe17603116e4");
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
});
