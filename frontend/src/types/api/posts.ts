export type TPost = {
  _id: number;
  desc?: string;
  img: string;
  createdAt: string;
  userId: number;
  likes: Array<string>;
  comment: number;
}