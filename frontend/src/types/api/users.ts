export type TUser = {
  _id? : string;
  userId?: number;
  username: string;
  email?: string;
  password?: string;
  profilePicture?: string;
  coverPicture?: string;
  followers?: Array<string> | undefined;
  followings?: Array<string> | undefined;
  isAdmin?: boolean;
  desc?: string;
  city?: string;
  createdAt?: string;
  updatedAt?: string;
}

