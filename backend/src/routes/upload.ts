import Express, { Request, Response } from "express";
import multer, { StorageEngine } from "multer";

import User from "../models/User";

const uploadrouter = Express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
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
