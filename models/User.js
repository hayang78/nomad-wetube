import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" }); //UserName으로 사용될 필드가 email이라고 알려준다.

//첫번째 파라메터 이름으로 Collection을 만든다. 소문자로 변환후 복수형으로 변환
const model = mongoose.model("User", UserSchema);

export default model;
