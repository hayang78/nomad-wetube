import express from "express";
import routes from "../routes";
import {
  users,
  userDetail,
  editProfile,
  changePassword
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.users, users);
userRouter.get(routes.userDetail, userDetail);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);

export default userRouter;

//export default 파일 전체를 export한다.
//default를 뺄 경우 해당 변수만 export한다.
//export const userRouter = express.Router();

// 삭제
// userRouter.get("/", (req, res) => res.send("user index"));
// userRouter.get("/edit", (req, res) => res.send("user edit"));
// userRouter.get("/password", (req, res) => res.send("user password"));
