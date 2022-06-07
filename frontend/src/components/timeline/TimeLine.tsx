/* eslint-disable  react-hooks/exhaustive-deps */
import { useState, memo, useEffect, FC } from "react";
import axios from "axios";

import { TPost } from "../../types/api/posts";
import { Post } from "../post/Post";
import { Share } from "../share/Share";
import "./TimeLine.css";

type Props = {
  username?: string;
};

export const TimeLine: FC<Props> = memo((props) => {
  const { username } = props;
  const [posts, setPosts] = useState<Array<TPost>>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = (username)
        ? await axios.get<Array<TPost>>(`/posts/profile/${username}`)
        : await axios.get<Array<TPost>>("/posts/timeline/62972757ee8afe17603116e4");
      setPosts(response.data);
    };
    fetchPosts();
  }, [username,setPosts,posts]);

  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
});
