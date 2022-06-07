import Express, { Request, Response } from "express";

import Post, { IPost } from "../models/Post";
import User from "../models/User";

const postRoute = Express.Router();

interface PostRequest<T> extends Request {
  body: T;
  params: {
    id?: string;
    username?: string;
  };
}

//投稿を作成する
postRoute.post("/", async (req: PostRequest<IPost>, res: Response) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err: unknown) {
    return res.status(500).json(err);
  }
});

//投稿を更新する
postRoute.put("/:id", async (req: PostRequest<IPost>, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      if (post.userId === req.body.userId) {
        await post.updateOne({
          $set: req.body,
        });
        return res.status(200).json("投稿編集に成功しました");
      } else {
        return res.status(403).json("あなたは他の人の投稿を編集出来ません");
      }
    }
  } catch (err: unknown) {
    return res.status(403).json(err);
  }
});

//投稿を削除する
postRoute.delete("/:id", async (req: PostRequest<IPost>, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      if (post.userId === req.body.userId) {
        await post.deleteOne();
        return res.status(200).json("投稿削除に成功しました");
      } else {
        return res.status(403).json("あなたは他の人の投稿を削除出来ません");
      }
    }
  } catch (err: unknown) {
    return res.status(403).json(err);
  }
});

//特定の投稿を取得する
postRoute.get("/:id", async (req: PostRequest<IPost>, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err: unknown) {
    return res.status(403).json(err);
  }
});

//特定の投稿にいいねを押す。
postRoute.put("/:id/like", async (req: PostRequest<IPost>, res: Response) => {
  try {
    //post:いいねを押す対象の投稿
    const post = await Post.findById(req.params.id);
    if (post) {
      //まだ投稿にいいねが押されていなかったらいいねを押すことが出来る。
      if (!post.likes?.includes(req.body.userId)) {
        await post.updateOne({
          $push: {
            likes: req.body.userId,
          },
        });
        return res.status(200).json("投稿にいいねを押しました");
        //投稿に既にいいねが押されていたら、いいねしているユーザIDを取り除く
      } else {
        await post.updateOne({
          $pull: {
            likes: req.body.userId,
          },
        });
        return res.status(200).json("投稿のいいねを外しました");
      }
    }
  } catch (err: unknown) {
    return res.status(500).json(err);
  }
});

//プロフィール専用のタイムラインの取得
postRoute.get(
  "/profile/:username",
  async (req: PostRequest<IPost>, res: Response) => {
    try {
      const user = await User.findOne({ username: req.params.username});
      if (user) {
        //ユーザー自身が投稿したPostを全て取得する。
        const posts = await Post.find({ userId: user._id });
        return res.status(200).json(posts);
      }
    } catch (err: unknown) {
      return res.status(500).json(err);
    }
  }
);



//タイムラインの投稿を取得
postRoute.get(
  "/timeline/:id",
  async (req: PostRequest<IPost>, res: Response) => {
    try {
      const currentUser = await User.findById(req.params.id);
      if (currentUser) {
        //ユーザー自身が投稿したPostを全て取得する。
        const userPosts = await Post.find({ userId: currentUser._id });
        
        //自分がフォローしている友達の投稿内容をすべて取得する(非同期処理対応あり,async,await未使用)
        if (currentUser.followings === undefined){
          throw new Error("followings undefined!!")
        }
        const friendPosts = await Promise.all(
          currentUser.followings?.map((friendId: string) => {
              return Post.find({ userId: friendId })
          })
        ); 
        return res.status(200).json(userPosts.concat(...friendPosts));
        // return res.status(200).json([userPosts,...friendPosts]);
      }
    } catch (err: unknown) {
      return res.status(500).json(err);
    }
  }
);

export default postRoute;
