import mongoose, { Model } from "mongoose";

export interface IPost {
  _id: string;
  _doc?: any;
  userId: string;
  desc?: string;
  img?: string;
  likes?: Array<string> | undefined;
  createdAt: string;
  updatedAt: string;
}

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 200,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post: Model<IPost> = mongoose.model("Post", PostSchema);
export default Post;
