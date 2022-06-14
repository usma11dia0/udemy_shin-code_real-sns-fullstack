import { useCallback, useContext } from "react";
import { Search, Chat, Notifications, Logout } from "@mui/icons-material";
import "./Topbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

export const Topbar = () => {
  const { user } = useContext(AuthContext);
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const onClickLogout = useCallback(() => {
    localStorage.removeItem("user");
    window.location.reload();
  },[]);

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
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">2</span>
            </div>
            <Link to={`/profile/${user!.username}`}>
              <img
                src={
                  user!.profilePicture
                    ? PUBLIC_FOLDER + user!.profilePicture
                    : PUBLIC_FOLDER + "/person/noAvatar.png"
                }
                alt=""
                className="topbarImg"
              />
            </Link>
            <div className="logoutIcon" onClick={onClickLogout}>
              {/* <Link to = '/register'> */}
                <Logout />
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
