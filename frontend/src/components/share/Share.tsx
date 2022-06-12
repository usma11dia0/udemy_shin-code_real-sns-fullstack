import React, {
  memo,
  useContext,
  useRef,
  FormEvent,
  useState,
  ChangeEvent,
} from "react";
import { Analytics, Face, Gif, Image } from "@mui/icons-material";
import "./Share.css";
import { AuthContext } from "../../state/AuthContext";
import axios from "axios";

export const Share = memo(() => {
  const { user } = useContext(AuthContext);
  const desc = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File>();
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPost = {
      userId: user?._id,
      desc: desc.current ? desc.current.value : undefined,
    };

    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              !user
                ? PUBLIC_FOLDER + "/person/noAvatar.png"
                : !user.profilePicture
                ? PUBLIC_FOLDER + "/person/noAvatar.png"
                : user.profilePicture
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            type="test"
            className="shareInput"
            placeholder="今何してるの?"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />

        <form className="shareButtons" onSubmit={(e) => handleSubmit(e)}>
          <div className="shareOptions">
            <label className="shareOption" htmlFor="file">
              <Image className="shareIcon" htmlColor="blue" />
              <span className="shareOptionText">写真</span>
              <input
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                style={{ display: "none" }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  e.target.files ? setFile(e.target.files[0]) : undefined
                }
              />
            </label>
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
          <button className="shareButton" type="submit">
            投稿
          </button>
        </form>
      </div>
    </div>
  );
});
