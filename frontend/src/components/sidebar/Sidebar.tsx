import { memo, useContext } from "react";
import { Link } from "react-router-dom";

import { CloseFriend } from "../closeFriend/CloseFriend";
import {
  Bookmark,
  Home,
  MessageRounded,
  Notifications,
  Person,
  Search,
  Settings,
} from "@mui/icons-material";
import { Users } from "../../dummyData";
import "./Sidebar.css";
import { AuthContext } from "../../state/AuthContext";



export const Sidebar = memo(() => {
  
  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Home className="sidebarIcon" />
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <span className="sidebarListItemText">ホーム</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Search className="sidebarIcon" />
            <span className="sidebarListItemText">検索</span>
          </li>
          <li className="sidebarListItem">
            <Notifications className="sidebarIcon" />
            <span className="sidebarListItemText">通知</span>
          </li>
          <li className="sidebarListItem">
            <MessageRounded className="sidebarIcon" />
            <span className="sidebarListItemText">メッセージ</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">ブックマーク</span>
          </li>
          <li className="sidebarListItem">
            <Person className="sidebarIcon" />
            <Link
              to= {`/profile/${user?.username}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <span className="sidebarListItemText">プロフィール</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Settings className="sidebarIcon" />
            <span className="sidebarListItemText">設定</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((user) => (
            <CloseFriend user={user} key={user.userId} />
          ))}
        </ul>
      </div>
    </div>
  );
});
