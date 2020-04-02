import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import {
  githubLoginCallback,
  facebookLoginCallback
} from "./controllers/userController";
import routes from "./routes";

//passport-local-mongoose를 이용하면 strategy 생성
passport.use(User.createStrategy());
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.gitHubCallback}`
    },
    githubLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://07f4ba88.ngrok.io${routes.facebookCallback}`,
      //callbackURL: `http://localhost:4000${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "email", "photos"],
      scope: ["public_profile", "email"]
    },
    facebookLoginCallback
  )
);
//쿠키에 User.id만 담아서 보내도록  passpoartLocalMonggoose의 함수를 이용하여 설정
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//passport.serializeUser((user, done) => done(null, user));
//passport.deserializeUser((user, done) => done(null, user));
