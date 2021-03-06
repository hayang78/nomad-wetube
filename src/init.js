import "@babel/polyfill"; //빌드후 실행시 오류때문에
import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();

import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 4000; //env.PORT를 못찾으면 4000 사용

const handelListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handelListening);
