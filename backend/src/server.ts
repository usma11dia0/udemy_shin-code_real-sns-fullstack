import express, { Request, Response } from "express";
import userRoute from "./routes/users";
import authRoute from "./routes/auth";
import postRoute from "./routes/posts";
import uploadRoute from "./routes/upload";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
const PORT = 5000;
dotenv.config();

//データベース接続
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("DBと接続中");
  })
  .catch((err) => {
    console.log(err);
  });

//ミドルウェア
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/upload", uploadRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("hello express");
});

// app.get("/users", (req: Request, res: Response) => {
//   res.send("users express");
// });

app.listen(PORT, () => console.log("サーバーが起動しました"));
