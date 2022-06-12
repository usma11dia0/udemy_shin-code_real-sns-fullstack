import React, { memo, FC } from "react";
import { TUser } from "../../types/api/users";

type Props = {
  user: TUser;
}

export const Online: FC<Props> = memo((props) => {
  const { user } = props;
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : undefined}
          alt=""
          className="rightbarProfileImg"
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
});
