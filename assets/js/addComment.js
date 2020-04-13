import axios from "axios";

const addCommnetForm = document.getElementById("jsAddComment");

const sendComment = async comment => {
  //console.log(comment);
  const videoId = window.location.href.split("/videos/")[1];

  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: { comment: comment } //comment는 handleSubmit으로부터 넘어옴
  });
  console.log(response);
};

const handleSubmit = event => {
  event.preventDefault(); //이벤트를 차단
  const commentInput = addCommnetForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommnetForm.addEventListener("submit", handleSubmit);
}

if (addCommnetForm) {
  init();
}
