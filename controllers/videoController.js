//import { videos } from "../db"; // DB초기화는  init.js에서 처리
import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 }); // -1 -> 역순정렬
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  //const searchingBy = req.query.term; //ES6 이전 예전방식
  const {
    query: { term: searchingBy } //term을 searchingBy로 재할당
  } = req;
  //console.log(term); //searchingBy로 할당했기 때문에 오류 발생
  //console.log(searchingBy);

  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    }); //options i -> insensitive 덜민감하게 검색
  } catch (error) {
    console.log(error);
  }
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

export const videoDetail = async (req, res) => {
  //console.log(req.params);
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id);
    //console.log(video);
    res.render("videoDetail", { pageTitle: video.title, video }); //video => video: video와 동일 같은 이름을 쓸때는 이렇게 사용가능ㅎ다.
  } catch (error) {
    //console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description }); //{_id: id}, {title: title, description: description} 과 동일
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
    //res.render("deleteVideo", { pageTitle: "Delete Video" });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
