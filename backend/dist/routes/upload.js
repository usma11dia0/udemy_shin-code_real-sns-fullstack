"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const dotenv_1 = __importDefault(require("dotenv"));
const uploadrouter = express_1.default.Router();
dotenv_1.default.config();
const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER_FOR_MULTER;
console.log(PUBLIC_FOLDER);
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PUBLIC_FOLDER);
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});
const upload = (0, multer_1.default)({ storage });
//画像アップロード用API
uploadrouter.post("/", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("画像アップロードに成功しました。");
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = uploadrouter;
