const video = document.getElementById('video');
const captureBtn = document.getElementById('captureBtn');
const canvas = document.getElementById('canvas') || document.createElement('canvas');
const photo = document.getElementById('photo');
const countdownEl = document.getElementById('countdown');
const downloadLink = document.getElementById('downloadLink');
const filterSelect = document.getElementById('filterSelect');

// Start front camera
navigator.mediaDevices.getUserMedia({
  video: { facingMode: 'user' },
  audio: false
}).then(stream => {
  video.srcObject = stream;
}).catch(err => {
  alert("Camera error: " + err);
});

// Apply selected filter live
filterSelect.addEventListener('change', () => {
  video.style.filter = filterSelect.value;
});

// Countdown before capture
function startCountdown(seconds, callback) {
  countdownEl.innerText = seconds;
  const interval = setInterval(() => {
    seconds--;
    if (seconds > 0) {
      countdownEl.innerText = seconds;
    } else {
      clearInterval(interval);
      countdownEl.innerText = '';
      callback();
    }
  }, 1000);
}

// Capture photo
captureBtn.addEventListener('click', () => {
  startCountdown(3, () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Apply filter to canvas too
    context.filter = filterSelect.value;
    context.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/png');
    photo.src = imageData;
    photo.style.display = 'block';

    downloadLink.href = imageData;
    downloadLink.style.display = 'inline-block';
  });
});
