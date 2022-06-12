import React, { FC, memo } from "react";
import { TUser } from "../../types/api/users";

type Props = {
  user: TUser;
  key: number;
};

export const CloseFriend: FC<Props> = memo((props) => {
  const { user } = props;
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="sidebarFriend">
      <img
        src={
          user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : undefined
        }
        alt=""
        className="sidebarFriendImg"
      />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
});
