import Express, { Request, Response } from "express";
import multer from "multer";
import dotenv from "dotenv";

const uploadrouter = Express.Router();
dotenv.config();
const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER_FOR_MULTER;
console.log(PUBLIC_FOLDER);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PUBLIC_FOLDER!);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });

//画像アップロード用API
uploadrouter.post("/", upload.single("file"), (req: Request, res: Response) => {
  try {
    return res.status(200).json("画像アップロードに成功しました。");
  } catch (err: unknown) {
    console.log(err);
  }
});

export default uploadrouter;
