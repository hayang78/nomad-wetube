import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";

//passport-local-mongoose를 이용하면 strategy 생성
passport.use(User.createStrategy());
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: "http://localhost:4000/auth/github/callback"
    },
    githubLoginCallback
  )
);

//쿠키에 User.id만 담아서 보내도록  passpoartLocalMonggoose의 함수를 이용하여 설정
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
