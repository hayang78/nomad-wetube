import multer from "multer";
import routes from "./routes";

export const multerVideo = multer({ dest: "uploads/videos/" }); //videos/ 서버에 저장될 경로 // /videos/ 라고 쓸경우 루트에 폴더 생성

//Express response -> rs.locals 참고
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  next();
};

//Single은 하나의 파일만 업로드할수있다. videoFile -> Form.input의 이름
export const uploadVideo = multerVideo.single("videoFile");
