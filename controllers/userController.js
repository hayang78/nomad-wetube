import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  //console.log(req.body);
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400); //브라우저에 Badrequest(400)을 전송하고 join을 다시 보여줌
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      //To Do: Register User
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

//"local"은 설치해준 passport-local Stratgy 이름
//authenticate는 Username(->email)과 password를 찾아보도록 되어있음
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

//export const githubLogin =

export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken, refreshToken, profile, cb);
  //User.findOrCreate({ githubId: profile.id }, function (err, user) {
  //  return cb(err, user);
};

export const logout = (req, res) => {
  // Process Log Out
  req.logout(); //passport 로그아웃
  res.redirect(routes.home);
  //res.render("logout", { pageTitle: "Logged Out" });
};

export const users = (req, res) => res.render("users", { pageTitle: "Users" });

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });

export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
