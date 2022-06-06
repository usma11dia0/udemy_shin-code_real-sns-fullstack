import React, { FC, memo } from "react";
import { TUser } from "../../types/api/users";

type Props = {
  user: TUser;
  key: number;
};

export const CloseFriend: FC<Props> = memo((props) => {
  const { user } = props;
  return (
    <li className="sidebarFriend">
      <img src={user.profilePicture} alt="" className="sidebarFriendImg" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
});
