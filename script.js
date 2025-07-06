const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const startBtn = document.getElementById("start");
const countdownEl = document.getElementById("countdown");
const output = document.getElementById("output");

// Access webcam
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  video.srcObject = stream;
});

// Countdown and snapshot
startBtn.onclick = () => {
  let count = 3;
  countdownEl.innerText = count;
  countdownEl.style.display = "block";

  const interval = setInterval(() => {
    count--;
    countdownEl.innerText = count;
    if (count === 0) {
      clearInterval(interval);
      countdownEl.style.display = "none";
      takePhoto();
    }
  }, 1000);
};

function takePhoto() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imgURL = canvas.toDataURL("image/png");
  const img = document.createElement("img");
  img.src = imgURL;
  output.innerHTML = "";
  output.appendChild(img);
}
