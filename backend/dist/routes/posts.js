"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Post_1 = __importDefault(require("../models/Post"));
const User_1 = __importDefault(require("../models/User"));
const postRoute = express_1.default.Router();
//投稿を作成する
postRoute.post("/", async (req, res) => {
    const newPost = new Post_1.default(req.body);
    try {
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
//投稿を更新する
postRoute.put("/:id", async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.id);
        if (post) {
            if (post.userId === req.body.userId) {
                await post.updateOne({
                    $set: req.body,
                });
                return res.status(200).json("投稿編集に成功しました");
            }
            else {
                return res.status(403).json("あなたは他の人の投稿を編集出来ません");
            }
        }
    }
    catch (err) {
        return res.status(403).json(err);
    }
});
//投稿を削除する
postRoute.delete("/:id", async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.id);
        if (post) {
            if (post.userId === req.body.userId) {
                await post.deleteOne();
                return res.status(200).json("投稿削除に成功しました");
            }
            else {
                return res.status(403).json("あなたは他の人の投稿を削除出来ません");
            }
        }
    }
    catch (err) {
        return res.status(403).json(err);
    }
});
//特定の投稿を取得する
postRoute.get("/:id", async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.id);
        return res.status(200).json(post);
    }
    catch (err) {
        return res.status(403).json(err);
    }
});
//特定の投稿にいいねを押す。
postRoute.put("/:id/like", async (req, res) => {
    var _a;
    try {
        //post:いいねを押す対象の投稿
        const post = await Post_1.default.findById(req.params.id);
        if (post) {
            //まだ投稿にいいねが押されていなかったらいいねを押すことが出来る。
            if (!((_a = post.likes) === null || _a === void 0 ? void 0 : _a.includes(req.body.userId))) {
                await post.updateOne({
                    $push: {
                        likes: req.body.userId,
                    },
                });
                return res.status(200).json("投稿にいいねを押しました");
                //投稿に既にいいねが押されていたら、いいねしているユーザIDを取り除く
            }
            else {
                await post.updateOne({
                    $pull: {
                        likes: req.body.userId,
                    },
                });
                return res.status(200).json("投稿のいいねを外しました");
            }
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
//タイムラインの投稿を取得
postRoute.get("/timeline/all", async (req, res) => {
    var _a;
    try {
        const currentUser = await User_1.default.findById(req.body.userId);
        if (currentUser) {
            //ユーザー自身が投稿したPostを全て取得する。
            const userPosts = await Post_1.default.find({ userId: currentUser._id });
            // //自信がフォローしている友達の投稿内容をすべて取得する(非同期処理対応無し,async,await未使用)
            // const friendPosts:any = () => { 
            //   currentUser.followings?.map((friendId:string) => {
            //       Post.find({userId: friendId});
            //     }
            //   );
            // }
            // return res.status(200).json(userPosts.concat(...friendPosts));
            //自分がフォローしている友達の投稿内容をすべて取得する(非同期処理対応あり,async,await未使用)
            if (currentUser.followings === undefined) {
                throw new Error("followings undefined!!");
            }
            const friendPosts = await Promise.all((_a = currentUser.followings) === null || _a === void 0 ? void 0 : _a.map((friendId) => {
                return Post_1.default.find({ userId: friendId });
            }));
            return res.status(200).json(userPosts.concat(...friendPosts));
            // return res.status(200).json([userPosts,...friendPosts]);
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.default = postRoute;
