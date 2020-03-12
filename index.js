import express from "express";
//const express = require("express");
const app = express();

const PORT = 4000;

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("Hello from Home");

const handleProfile = (req, res) => res.send("You are on my profile");

const betweenHome = (req, res, next) => {
  console.log("Between");
  next();
};

app.use(betweenHome); //모든 route에 미들웨어 추가. route 정의 전에 선언해야함.

//app.get("/", betweenHome, handleHome); //하나의 route에 미들웨어 추가
app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
// // respond with "hello world" when a GET request is made to the homepage
// app.get('/', function(req, res) {
//   res.send('hello world');
// });
