"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const posts_1 = __importDefault(require("./routes/posts"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const PORT = 3000;
dotenv_1.default.config();
//データベース接続
mongoose_1.default
    .connect(process.env.MONGOURL)
    .then(() => {
    console.log("DBと接続中");
})
    .catch((err) => {
    console.log(err);
});
//ミドルウェア
app.use(express_1.default.json());
app.use("/api/users", users_1.default);
app.use("/api/auth", auth_1.default);
app.use("/api/posts", posts_1.default);
app.get("/", (req, res) => {
    res.send("hello express");
});
// app.get("/users", (req: Request, res: Response) => {
//   res.send("users express");
// });
app.listen(PORT, () => console.log("サーバーが起動しました"));
