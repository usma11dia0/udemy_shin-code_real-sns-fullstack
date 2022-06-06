import Express, { Request, Response } from "express";
import User, { IUser } from "../models/User";
const userRoute = Express.Router();

interface UserRequest<T> extends Request {
  body: T;
  params: {
    id?: string;
  };
}

//CRUD
//ユーザー情報の更新
userRoute.put("/:id", async (req: UserRequest<IUser>, res: Response) => {
  if (req.body._id === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("ユーザー情報を更新しました");
    } catch (err: unknown) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json("あなたは自分のアカウントの時だけ情報を更新できます");
  }
});

//ユーザー情報の削除
userRoute.delete("/:id", async (req: UserRequest<IUser>, res: Response) => {
  if (req.body._id === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("ユーザー情報を削除しました");
    } catch (err: unknown) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json("あなたは自分のアカウントの時だけ情報を削除できます");
  }
});

//ユーザー情報の取得
userRoute.get("/:id", async (req: UserRequest<IUser>, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    }
  } catch (err: unknown) {
    return res.status(500).json(err);
  }
});

//ユーザーのフォロー
userRoute.put("/:id/follow", async (req: UserRequest<IUser>, res: Response) => {
  if (req.body._id !== req.params.id) {
    try {
      //user:フォロー対象のユーザー
      const user = await User.findById(req.params.id);
      //currentuser: フォローするユーザー
      const currentUser = await User.findById(req.body._id);
      if (user) {
        //フォロー対象ユーザーのフォロワーに自分がいなかったらフォロー出来る
        if (!user.followers?.includes(req.body._id)) {
          await user.updateOne({
            $push: {
              followers: req.body._id,
            },
          });
          await currentUser?.updateOne({
            $push: {
              followings: req.params.id,
            },
          });
          return res.status(200).json("フォローに成功しました");
        } else {
          return res
            .status(403)
            .json("あなたは既にこのユーザーをフォローしています");
        }
      }
    } catch (err: unknown) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("自分自身をフォローできません");
  }
});

//ユーザーのフォローを外す
userRoute.put(
  "/:id/unfollow",
  async (req: UserRequest<IUser>, res: Response) => {
    if (req.body._id !== req.params.id) {
      try {
        //user:アンフォロー対象のユーザー
        const user = await User.findById(req.params.id);
        //currentuser:アンフォローするユーザー
        const currentUser = await User.findById(req.body._id);
        if (user) {
          //アンフォロー対象ユーザーのフォロワーに自分が存在したらフォローを外す
          if (user.followers?.includes(req.body._id)) {
            await user.updateOne({
              $pull: {
                followers: req.body._id,
              },
            });
            await currentUser?.updateOne({
              $pull: {
                followings: req.params.id,
              },
            });
            return res.status(200).json("フォロー解除しました");
          } else {
            return res.status(403).json("このユーザーはフォロー解除出来ません");
          }
        }
      } catch (err: unknown) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(500).json("自分自身をフォロー解除出来ません");
    }
  }
);

export default userRoute;
