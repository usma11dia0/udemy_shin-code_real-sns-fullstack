import mongoose, { Model } from "mongoose";

export interface IUser {
  _id: string;
  _doc?: any;
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  coverPicture?: string;
  followers?: Array<string> | undefined;
  followings?: Array<string> | undefined;
  isAdmin?: boolean;
  desc?: string;
  city?: string;
  createdAt: string;
  updatedAt: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 25,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 50,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 70,
    },
    city: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model("User", UserSchema);
export default User;
