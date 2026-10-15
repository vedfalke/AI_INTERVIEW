import express from "express"
 import isAuth from "../middlewares/isAuth";
 import { upload } from "../middlewares/multer";
import { analyzeResume } from "../controllers/interview.controller";

const interviewRouter = express.Router()
 interviewRouter.post("/resume",isAuth,upload.single("resume"),
 analyzeResume)

export default interviewRouter;