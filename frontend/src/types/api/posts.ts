export type TPost = {
  _id?: number;
  desc?: string;
  img?: string;
  createdAt?: string;
  userId: String | undefined;
  likes?: Array<string> | undefined;
  comment?: number;
}