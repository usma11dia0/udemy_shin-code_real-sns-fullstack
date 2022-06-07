import React, { FC, memo, useCallback, useState,useEffect } from "react";
import axios from "axios";
import { MoreVert } from "@mui/icons-material";
import { TUser } from "../../types/api/users";
import { TPost } from "../../types/api/posts";
// import { Users } from "../../dummyData";
import "./Post.css";

type Props = {
  post: TPost;
};

export const Post: FC<Props> = memo((props) => {
  const { post } = props;
  const [like, setLike] = useState<number>(0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState<TUser>();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get<TUser>(`/users/${post.userId}`);
      console.log(response);
      setUser(response.data);
    };
    fetchUser();
  }, []);

  const handleLike = useCallback(() => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }, [setLike, setIsLiked, like, isLiked]);

  if (user === undefined) {
    throw new Error("ユーザーが見つかりません");
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src = {(user)? user.profilePicture : "/assets/person/noAvatar.png"}
              alt=""
              className="postProfileImg"
            />
            <span className="postUsername">
              {(user)? user.username : ""}
            </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img src={post.photo} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={
                "/assets/heart.png"
              }
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
