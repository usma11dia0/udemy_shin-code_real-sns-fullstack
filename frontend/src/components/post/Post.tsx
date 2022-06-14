/* eslint-disable  react-hooks/exhaustive-deps */

import React, {
  FC,
  memo,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";
import { TUser } from "../../types/api/users";
import { TPost } from "../../types/api/posts";
import "./Post.css";

import axios from "axios";
import { format } from "timeago.js";
import { Delete, MoreVert } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";
import { pink } from "@mui/material/colors";

type Props = {
  post: TPost;
};

export const Post: FC<Props> = memo((props) => {
  const { post } = props;
  const { user: loginUser } = useContext(AuthContext);
  const [like, setLike] = useState<number>(post.likes ? post.likes.length : 0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState<TUser>();
  const [toggleClass, setToggleClass] = useState(false)
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get<TUser>(`/users?userId=${post.userId}`);
      setUser(response.data);
    };
    fetchUser();
  }, [post.userId]);

  const handleLike = useCallback(async () => {
    try {
      //いいねのAPIを叩く
      await axios.put(`/posts/${post._id}/like`, { userId: loginUser!._id });
    } catch (err: unknown) {
      console.log(err);
    }

    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }, [setLike, setIsLiked, like, isLiked]);

  const onToggle = useCallback(() => {
    console.log('再レンダリングチェック');
    setToggleClass(!toggleClass);
  },[toggleClass]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user ? user.username : ""}`}>
              <img
                src={
                  !user
                    ? PUBLIC_FOLDER + "/person/noAvatar.png"
                    : !user.profilePicture
                    ? PUBLIC_FOLDER + "/person/noAvatar.png"
                    : PUBLIC_FOLDER + user.profilePicture
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user ? user.username : ""}</span>
            <span className="postDate">{format(post.createdAt!)}</span>
          </div>
          <div className="postTopRight">
            <nav className= {`${toggleClass? "miniMenu menuOpen" : "miniMenu"}`}>
                <Delete sx={{ color: pink[500] }}/>
                <div className = "miniMenuText">削除</div>
            </nav>
            <MoreVert className="MoreVertIcon" onClick={() => onToggle()} />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img
            src={post.img ? PUBLIC_FOLDER + post.img : undefined}
            alt=""
            className="postImg"
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={PUBLIC_FOLDER + "/heart.png"}
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
