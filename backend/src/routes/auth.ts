import Express, { Request, Response } from "express";
import User from "../models/User";

const authRoute = Express.Router();

interface UserRegisterRequest extends Request {
  body: {
    username: string;
    email: string;
    password: string;
  };
}

//ユーザー登録
authRoute.post("/register", async (req: UserRegisterRequest, res: Response) => {
  try {
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (err: unknown) {
    return res.status(500).json(err);
  }
});

//ログイン
authRoute.post("/login", async (req: UserRegisterRequest, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("ユーザーが見つかりません");

    const vailedPassword = req.body.password === user.password;
    if (!vailedPassword) return res.status(400).json("パスワードが違います");

    return res.status(200).json(user);
  } catch (err: unknown) {
    return res.status(500).json(err);
  }
});

// authRoute.get("/", (req: Request, res: Response) => {
//   res.send("auth router");
// });

export default authRoute;
