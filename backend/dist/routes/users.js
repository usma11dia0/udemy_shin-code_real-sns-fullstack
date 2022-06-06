"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const userRoute = express_1.default.Router();
//CRUD
//ユーザー情報の更新
userRoute.put("/:id", async (req, res) => {
    if (req.body._id === req.params.id || req.body.isAdmin) {
        try {
            const user = await User_1.default.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("ユーザー情報を更新しました");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res
            .status(403)
            .json("あなたは自分のアカウントの時だけ情報を更新できます");
    }
});
//ユーザー情報の削除
userRoute.delete("/:id", async (req, res) => {
    if (req.body._id === req.params.id || req.body.isAdmin) {
        try {
            const user = await User_1.default.findByIdAndDelete(req.params.id);
            res.status(200).json("ユーザー情報を削除しました");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res
            .status(403)
            .json("あなたは自分のアカウントの時だけ情報を削除できます");
    }
});
//ユーザー情報の取得
userRoute.get("/:id", async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id);
        if (user) {
            const { password, updatedAt, ...other } = user._doc;
            res.status(200).json(other);
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
//ユーザーのフォロー
userRoute.put("/:id/follow", async (req, res) => {
    var _a;
    if (req.body._id !== req.params.id) {
        try {
            //user:フォロー対象のユーザー
            const user = await User_1.default.findById(req.params.id);
            //currentuser: フォローするユーザー
            const currentUser = await User_1.default.findById(req.body._id);
            if (user) {
                //フォロー対象ユーザーのフォロワーに自分がいなかったらフォロー出来る
                if (!((_a = user.followers) === null || _a === void 0 ? void 0 : _a.includes(req.body._id))) {
                    await user.updateOne({
                        $push: {
                            followers: req.body._id,
                        },
                    });
                    await (currentUser === null || currentUser === void 0 ? void 0 : currentUser.updateOne({
                        $push: {
                            followings: req.params.id,
                        },
                    }));
                    return res.status(200).json("フォローに成功しました");
                }
                else {
                    return res
                        .status(403)
                        .json("あなたは既にこのユーザーをフォローしています");
                }
            }
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(500).json("自分自身をフォローできません");
    }
});
//ユーザーのフォローを外す
userRoute.put("/:id/unfollow", async (req, res) => {
    var _a;
    if (req.body._id !== req.params.id) {
        try {
            //user:アンフォロー対象のユーザー
            const user = await User_1.default.findById(req.params.id);
            //currentuser:アンフォローするユーザー
            const currentUser = await User_1.default.findById(req.body._id);
            if (user) {
                //アンフォロー対象ユーザーのフォロワーに自分が存在したらフォローを外す
                if ((_a = user.followers) === null || _a === void 0 ? void 0 : _a.includes(req.body._id)) {
                    await user.updateOne({
                        $pull: {
                            followers: req.body._id,
                        },
                    });
                    await (currentUser === null || currentUser === void 0 ? void 0 : currentUser.updateOne({
                        $pull: {
                            followings: req.params.id,
                        },
                    }));
                    return res.status(200).json("フォロー解除しました");
                }
                else {
                    return res.status(403).json("このユーザーはフォロー解除出来ません");
                }
            }
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(500).json("自分自身をフォロー解除出来ません");
    }
});
exports.default = userRoute;
