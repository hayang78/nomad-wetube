const path = require("path"); //모던js => import path from "path"
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js"); //__dirname: 현재 디레토리 경로, Node.js 전역변수
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ENTRY_FILE,
  output: {
    path: OUTPUT_DIR,
    filename: "[name].[format]"
  }
};

module.exports = config;
