/* eslint-disable  react-hooks/exhaustive-deps */
import { useState, memo, useEffect, FC, useContext } from "react";
import axios from "axios";

import { TPost } from "../../types/api/posts";
import { Post } from "../post/Post";
import { Share } from "../share/Share";
import "./TimeLine.css";
import { AuthContext } from "../../state/AuthContext";

type Props = {
  username?: string;
};

export const TimeLine: FC<Props> = memo((props) => {
  const { username } = props;
  const {user} = useContext(AuthContext);
  const [posts, setPosts] = useState<Array<TPost>>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = (username)
        ? await axios.get<Array<TPost>>(`/posts/profile/${username}`) //プロフィールの場合
        : await axios.get<Array<TPost>>(`/posts/timeline/${user!._id}`); //ホームの場合
      setPosts(response.data);
    };
    fetchPosts();
  }, [username, user!._id]);

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
