const path = require("path"); //모던js => import path from "path"
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV; //개발모드, 제품모드로 설정, 실행시 파라메터로 전달

const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js"); //__dirname: 현재 디레토리 경로, Node.js 전역변수
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(scss)$/, //scss파일을 찾아서
        use: ExtractCSS.extract([
          //중요! 웹팩 환경파일은 아래에서 위로 올라오면서 처리되므로 처리 순서를 반대로 해야한다.
          {
            loader: "css-loader" //3.웹팰에서 css를 읽음
          },
          {
            loader: "postcss-loader", //2.css를 받아서 plugin을 가지고 css를 호환성 관련 해결, ex>IE 호환등 prefix등등 처리
            options: {
              plugins() {
                return [autoprefixer({ overrideBrowserslist: "cover 99.5%" })];
              }
            }
          },
          {
            loader: "sass-loader" //1.sass-loader -> sass 또는 scss를 일반 css로 바꿀수있다.
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  plugins: [new ExtractCSS("styles.css")]
};

module.exports = config;
