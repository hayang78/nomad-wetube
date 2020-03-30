import passport from "passport";
import User from "./models/User";

//passport-local-mongoose를 이용하면 strategy 생성
passport.use(User.createStrategy());

//쿠키에 User.id만 담아서 보내도록  passpoartLocalMonggoose의 함수를 이용하여 설정
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
