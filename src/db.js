import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//process.env.PRODUCTION ? ... : ... 배포환경에서 따로 읽을 수 있게
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

const handleOpen = () => {
  console.log("Connected to DB");
};

const handleError = (error) => {
  console.log(`Error on DB connection: ${error}`);
};

db.once("open", handleOpen);
db.on("error", handleError);
