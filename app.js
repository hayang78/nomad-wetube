//const express = require("express");
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyparser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middleware";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
//import { userRouter } from "./routers/userRouter"; // export default로 선언하지 않은 것을 import할때는 이렇게 import 해야한다.

import "./passport";

const app = express();

const CookieStore = MongoStore(session);

//const handleHome = (req, res) => res.send("Hello from Home"); //삭제
//const handleProfile = (req, res) => res.send("You are on my profile"); //삭제

app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads")); //디렉토리를 전달해줌. /uploads로 접근시 uploads 디렉토리 전달
//app.use("/users/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan("dev")); //모든 route에 미들웨어 추가. route 정의 전에 선언해야함.

//현재는 세션을 메모리에 저장하기 때문에 서버를 재기동하면 모든 세션이 삭제 된다.
app.use(
  session({
    secret: process.env.COOKIE_SECRET, //세션 암호화키 randomkeygen.com에서 생성
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({
      mongooseConnection: mongoose.connection
    })
  })
);

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
app.use(routes.api, apiRouter);

export default app;
