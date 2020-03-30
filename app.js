//const express = require("express");
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyparser from "body-parser";
import { localsMiddleware } from "./middleware";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
//import { userRouter } from "./routers/userRouter"; // export default로 선언하지 않은 것을 import할때는 이렇게 import 해야한다.

import passport from "passport";

import "./passport";

const app = express();

//const handleHome = (req, res) => res.send("Hello from Home"); //삭제
//const handleProfile = (req, res) => res.send("You are on my profile"); //삭제

app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads")); //디렉토리를 전달해줌. /uploads로 접근시 uploads 디렉토리 전달
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan("dev")); //모든 route에 미들웨어 추가. route 정의 전에 선언해야함.

//Passport가 쿠키를 보고, 그 쿠키 정보에 해당하는 사용자를 찾아준다.
//passport는 자기가 찾은 사용자를 요청(request)의 object(req.user)로 만들어준다.
app.use(passport.initialize());

app.use(passport.session()); // 세션이라는 것을 저장한다.

app.use(localsMiddleware);

//app.get("/", betweenHome, handleHome); //하나의 route에 미들웨어 추가
//app.get("/", handleHome); //삭제
//app.get("/profile", handleProfile); //삭제

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); // /user로 들어오는 모든 요청을 userRouter로 이용한다.
app.use(routes.videos, videoRouter);

export default app;
