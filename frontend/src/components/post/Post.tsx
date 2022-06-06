import React, { FC, memo, useCallback, useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { TPost } from "../../types/api/posts";
import { Users } from "../../dummyData";
import "./Post.css";

type Props = {
  post: TPost;
};

export const Post: FC<Props> = memo((props) => {
  const { post } = props;
  const [like, setLike] = useState<number>(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = useCallback(() => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }, [setLike, setIsLiked, like, isLiked]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={Users.filter((user) => user.id === post.id)[0].profilePicture}
              alt=""
              className="postProfileImg"
            />
            <span className="postUsername">
              {Users.filter((user) => user.id === post.id)[0].username}
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
