"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const authRoute = express_1.default.Router();
//ユーザー登録
authRoute.post("/register", async (req, res) => {
    try {
        const newUser = await new User_1.default({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        const user = await newUser.save();
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
//ログイン
authRoute.post("/login", async (req, res) => {
    try {
        const user = await User_1.default.findOne({ email: req.body.email });
        if (!user)
            return res.status(404).send("ユーザーが見つかりません");
        const vailedPassword = req.body.password === user.password;
        if (!vailedPassword)
            return res.status(400).json("パスワードが違います");
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
// authRoute.get("/", (req: Request, res: Response) => {
//   res.send("auth router");
// });
exports.default = authRoute;
