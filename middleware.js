import multer from "multer";
import routes from "./routes";

export const multerVideo = multer({ dest: "uploads/videos/" }); //videos/ 서버에 저장될 경로 // /videos/ 라고 쓸경우 루트에 폴더 생성

//Express response -> rs.locals 참고
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  //passport가 사용자를 로그인 시킬때 user Object를 request에도 올려준다.
  //req.user가 없으면 빈object를 넘겨준다.
  res.locals.user = req.user || null;
  console.log(res.locals.user);
  next();
};

//Single은 하나의 파일만 업로드할수있다. videoFile -> Form.input의 이름
export const uploadVideo = multerVideo.single("videoFile");
