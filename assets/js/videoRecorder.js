const recordContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecoder;

const handleVideoData = event => {
  //console.log(event.data);
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click(); //강제로 클릭하게 만들어 다운로드 한다.
};

const startRecodring = () => {
  //console.log(streamObject);
  videoRecoder = new MediaRecorder(streamObject);
  //console.log(videoRecoder);
  videoRecoder.start();
  //videoRecoder.start(1000); //1초마다 Data chunk를 만든다.
  videoRecoder.addEventListener("dataavailable", handleVideoData); //레코딩이 끝나면 한번에 전체 데이터를 전달한다.
  //setTimeout(() => videoRecoder.stop(), 5000);
  recordBtn.addEventListener("click", stopRecording);
};

const stopRecording = () => {
  videoRecoder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start recording";
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    });
    //console.log(stream);
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "Stop recording";
    streamObject = stream;
    startRecodring();
  } catch (error) {
    recordBtn.innerHTML = ":( Can't record.";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

function init() {
  recordBtn.addEventListener("click", getVideo); // 여러 이벤트를 추가할 수 있다.
  //recordBtn.onclick = getVideo; // 하나의 이벤트만 추가할 수 있다.
}

if (recordContainer) {
  init();
}
