import { useContext } from "react";
import { Search, Chat, Notifications } from "@mui/icons-material";
import "./Topbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

export const Topbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <span className="logo">Real SNS</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              type="text"
              className="searchInput"
              placeholder="探し物は何ですか?"
            />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarItemIcons">
            <div className="topbarIconItem">
              <Chat />
              <span className="topbaIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbaIconBadge">2</span>
            </div>
            <Link to={`/profile/${user!.username}`}>
              <img
                src={
                  user!.profilePicture
                    ? user!.profilePicture
                    : "/assets/person/noAvatar.png"
                }
                alt=""
                className="topbarImg"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
