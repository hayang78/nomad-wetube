//import { videos } from "../db"; // DB초기화는  init.js에서 처리
import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = (req, res) => {
  //const searchingBy = req.query.term; //ES6 이전 예전방식
  const {
    query: { term: searchingBy } //term을 searchingBy로 재할당
  } = req;
  //console.log(term); //searchingBy로 할당했기 때문에 오류 발생
  //console.log(searchingBy);
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

//export const videos = (req, res) =>
//  res.render("videos", { pageTitle: "Videos" });

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  //const { body, file} = req;
  //console.log(body, file);

  const {
    body: { title, description },
    file: { path } //file: multer에서 넘겨주는 field. 여러 파일일 경우 files
  } = req;

  const newVideo = await Video.create({
    fileUrl: path,
    title: title,
    description: description
  });
  // To Do: Upload and Save Video
  //res.render("upload", { pageTitle: "Upload" });
  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
