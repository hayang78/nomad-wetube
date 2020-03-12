//const express = require("express");
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyparser from "body-parser";
import { userRouter } from "./router"; // export default로 선언되지않으면 이렇게 import 해야한다.
const app = express();

const handleHome = (req, res) => res.send("Hello from Home");

const handleProfile = (req, res) => res.send("You are on my profile");

app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev")); //모든 route에 미들웨어 추가. route 정의 전에 선언해야함.

//app.get("/", betweenHome, handleHome); //하나의 route에 미들웨어 추가
app.get("/", handleHome);

app.get("/profile", handleProfile);

app.use("/user", userRouter); // /user로 들어오는 모든 요청을 userRouter로 이용한다.

export default app;
