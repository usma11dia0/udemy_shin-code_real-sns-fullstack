/* eslint-disable  react-hooks/exhaustive-deps */

import React, { FC, memo, useCallback, useState, useEffect } from "react";
import { TUser } from "../../types/api/users";
import { TPost } from "../../types/api/posts";
import "./Post.css";

import axios from "axios";
import { format } from "timeago.js";
import { MoreVert } from "@mui/icons-material";
import { Link } from "react-router-dom";

type Props = {
  post: TPost;
};

export const Post: FC<Props> = memo((props) => {
  const { post } = props;
  const [like, setLike] = useState<number>(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState<TUser>();
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get<TUser>(`/users?userId=${post.userId}`);
      setUser(response.data);
    };
    fetchUser();
  }, [post.userId]);

  const handleLike = useCallback(() => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }, [setLike, setIsLiked, like, isLiked]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user ? user.username : ""}`}>
              <img
                src={
                  !user
                    ? "/assets/person/noAvatar.png"
                    : !user.profilePicture
                    ? "/assets/person/noAvatar.png"
                    : user.profilePicture
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user ? user.username : ""}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img src={PUBLIC_FOLDER + post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={"/assets/heart.png"}
              alt=""
              className="likeIcon"
              onClick={() => handleLike()}
            />
            <span className="postLikeCounter">
              {like}人がいいねを押しました
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText"> {post.comment}:コメント</span>
          </div>
        </div>
      </div>
    </div>
  );
});
