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

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  // async (accessToken, refreshToken, profile, cb) => {
  //console.log(profile);
  const {
    _json: { id, avatar_url, name, email }
  } = profile;

  try {
    const user = await User.findOne({ email });
    if (user) {
      //사용자를 찾으면 이미 등록된 사용자이기 때문에 로그인 정보에서 깃허브 아이디를 업데이트 시킨다.
      user.githubId = id;
      user.save();
      return cb(null, user);
    } else {
      //E11000 Duplicate Error - passportLocalMongoose 플러그인을 Collection을 생성한 이후에 추가해서 발생하는 오류
      //Collection을 삭제하고 다시 실행하면 정상 동작
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl: avatar_url
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  // async (accessToken, refreshToken, profile, cb) => {
  console.log(profile);
  // const {
  //   _json: { id, avatar_url, name, email }
  // } = profile;

  // try {
  //   const user = await User.findOne({ email });
  //   if (user) {
  //     //사용자를 찾으면 이미 등록된 사용자이기 때문에 로그인 정보에서 깃허브 아이디를 업데이트 시킨다.
  //     user.facebookId = id;
  //     user.save();
  //     return cb(null, user);
  //   } else {
  //     //E11000 Duplicate Error - passportLocalMongoose 플러그인을 Collection을 생성한 이후에 추가해서 발생하는 오류
  //     //Collection을 삭제하고 다시 실행하면 정상 동작
  //     const newUser = await User.create({
  //       email,
  //       name,
  //       facebookId: id,
  //       avatarUrl: avatar_url
  //     });
  //     return cb(null, newUser);
  //   }
  // } catch (error) {
  //   return cb(error);
  // }
};

export const postFacebookLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  // Process Log Out
  req.logout(); //passport 로그아웃
  res.redirect(routes.home);
  //res.render("logout", { pageTitle: "Logged Out" });
};

export const users = (req, res) => res.render("users", { pageTitle: "Users" });

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "User Detail" }, user);
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
