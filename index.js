import express from "express";
//const express = require("express");
const app = express();

const PORT = 4000;

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("Hello from Home");

const handleProfile = (req, res) => res.send("You are on my profile");

app.get("/", handleHome);
app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
// // respond with "hello world" when a GET request is made to the homepage
// app.get('/', function(req, res) {
//   res.send('hello world');
// });
