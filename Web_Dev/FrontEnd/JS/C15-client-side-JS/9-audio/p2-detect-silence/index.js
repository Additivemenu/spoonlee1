const startRecordButton = document.getElementById("start-record");
const stopRecordButton = document.getElementById("stop-record");
const audioPlayback = document.getElementById("audio-playback");

let mediaRecorder;
let audioChunks = [];
let silenceTimeout;


startRecordButton.onclick = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });
  mediaRecorder = new MediaRecorder(stream);

  // 
  const audioContext = new AudioContext();
  const source = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 2048;
  source.connect(analyser);

  const dataArray = new Uint8Array(analyser.fftSize);

  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
    const audioUrl = URL.createObjectURL(audioBlob);
    audioPlayback.src = audioUrl;
  };

  mediaRecorder.start();
  startRecordButton.disabled = true;
  stopRecordButton.disabled = false;

  // ! 
  const checkSilence = () => {
    analyser.getByteTimeDomainData(dataArray);  // !  get the time domain data of the audio
    let silent = true;
    for (let i = 0; i < dataArray.length; i++) {
      // 128 is the "no sound" threshold value
      if (dataArray[i] > 128 + 10 || dataArray[i] < 128 - 10) {
        // Adjust threshold as needed
        silent = false;
        break;
      }
    }

    if (silent) {
      clearTimeout(silenceTimeout);
      silenceTimeout = setTimeout(() => {
        mediaRecorder.stop();  // ! this stops the recording
        startRecordButton.disabled = false;
        stopRecordButton.disabled = true;
      }, 2000); // Stop recording after 2 seconds of silence
    } else {
      clearTimeout(silenceTimeout);
    }

    requestAnimationFrame(checkSilence);
  };

  checkSilence();
};


stopRecordButton.onclick = () => {
  mediaRecorder.stop();  // ! this stops the recording
  startRecordButton.disabled = false;
  stopRecordButton.disabled = true;
};
