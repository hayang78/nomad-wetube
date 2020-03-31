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

//이미 로그인이 되어있으면 Join등으로 접근을 차단하기 위한 미들웽어
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

//Single은 하나의 파일만 업로드할수있다. videoFile -> Form.input의 이름
export const uploadVideo = multerVideo.single("videoFile");
