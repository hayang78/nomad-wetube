import express from "express";
import routes from "../routes";
import {
  getUpload,
  videoDetail,
  getEditVideo,
  postEditVideo,
  deleteVideo,
  postUpload
} from "../controllers/videoController";
import { uploadVideo, onlyPrivate } from "../middleware";

export const videoRouter = express.Router();

//videoRouter.get(routes.videos, videos);
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

//export default 파일 전체를 export한다.
//default를 뺄 경우 해당 변수만 export한다.
export default videoRouter;
