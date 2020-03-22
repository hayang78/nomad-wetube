import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";

const PORT = process.env.PORT || 4000; //env.PORT를 못찾으면 4000 사용

const handelListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handelListening);
