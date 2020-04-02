import express from "express";
import routes from "../routes";
import {
  users,
  userDetail,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middleware";

const userRouter = express.Router();

userRouter.get(routes.users, users);
//userDetail이 먼저 오면 edit-profile을 :id로 인식해서 userdetail로 이동하기 때문에 먼저 선언해야함
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

userRouter.get(routes.userDetail(), userDetail);

export default userRouter;

//export default 파일 전체를 export한다.
//default를 뺄 경우 해당 변수만 export한다.
//export const userRouter = express.Router();

// 삭제
// userRouter.get("/", (req, res) => res.send("user index"));
// userRouter.get("/edit", (req, res) => res.send("user edit"));
// userRouter.get("/password", (req, res) => res.send("user password"));
