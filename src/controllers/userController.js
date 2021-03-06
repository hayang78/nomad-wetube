import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import { reset } from "nodemon";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  //console.log(req.body);
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    req.flash("error", "Passwords don't match");
    res.status(400); //브라우저에 Badrequest(400)을 전송하고 join을 다시 보여줌
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      //To Do: Register User
      const user = await User({
        name,
        email,
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
  successRedirect: routes.home,
  successFlash: "Welcome",
  failureFlash: "Can't log in. Check email and/or password",
});

export const githubLogin = passport.authenticate("github", {
  successFlash: "Welcome",
  failureFlash: "Can't log in at this time.",
});

export const githubLoginCallback = async (_, __, profile, cb) => {
  // async (accessToken, refreshToken, profile, cb) => {
  //console.log(profile);
  const {
    _json: { id, avatar_url, name, email },
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
        avatarUrl: avatar_url,
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

export const facebookLogin = passport.authenticate("facebook", {
  successFlash: "Welcome",
  failureFlash: "Can't log in at this time.",
});

export const facebookLoginCallback = async (_, __, profile, cb) => {
  // async (accessToken, refreshToken, profile, cb) => {
  console.log(profile);
  const {
    _json: { id, name, email },
  } = profile;

  try {
    const user = await User.findOne({ email });
    if (user) {
      //사용자를 찾으면 이미 등록된 사용자이기 때문에 로그인 정보에서 깃허브 아이디를 업데이트 시킨다.
      user.facebookId = id;
      user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    } else {
      //E11000 Duplicate Error - passportLocalMongoose 플러그인을 Collection을 생성한 이후에 추가해서 발생하는 오류
      //Collection을 삭제하고 다시 실행하면 정상 동작
      const newUser = await User.create({
        email,
        name,
        facebookId: id,
        avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

export const postFacebookLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.flash("info", "Logged out, see you later.");

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
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    req.flash("error", "User not found");
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  //console.log(name, email, file);
  try {
    //req.user는 passport에서 넣어주는 값이다.
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    req.flas("success", "Pofile updated.");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't update profile.");
    //console.log(error);
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;

  try {
    if (newPassword !== newPassword1) {
      req.flash("error", "Passwords don't match");
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword); //passport-local-mongoose 문서 참고
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't change password.");
    //console.log(error);
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};
