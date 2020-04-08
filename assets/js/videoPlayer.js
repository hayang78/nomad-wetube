const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");

console.log("Hi");
console.log(videoContainer);
//모든 페이지에 js파일이 로드되기 때문에 jsVideoPlayer가 없는 경우 에러가 발생한다.
//그래서 항상 체크하는 로직을 넣어줘야함
//videoContainer.addEventListener("click", () => false);

//function handlePlayClick() {
const handlePlayClick = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
};

function init() {
  playBtn.addEventListener("click", handlePlayClick);
}

if (videoContainer) {
  init();
}
