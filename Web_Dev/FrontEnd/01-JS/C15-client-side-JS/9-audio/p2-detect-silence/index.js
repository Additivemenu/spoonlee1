const startRecordButton = document.getElementById("start-record");
const stopRecordButton = document.getElementById("stop-record");
const audioPlayback = document.getElementById("audio-playback");

let mediaRecorder;
let audioChunks = [];
let silenceTimeout;
let interval;

startRecordButton.onclick = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });
  mediaRecorder = new MediaRecorder(stream);

  // setup audio context
  const audioContext = new AudioContext();
  const source = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  // ! config analyser node
  analyser.fftSize = 512;
  source.connect(analyser);

  const dataArray = new Uint8Array(analyser.fftSize); // ! the array that holds the audio data from analyser node

  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/webm" }); // chunk data to blob
    const audioUrl = URL.createObjectURL(audioBlob);
    audioPlayback.src = audioUrl;

    startRecordButton.disabled = false;
    stopRecordButton.disabled = true;
    clearInterval(interval);
  };

  mediaRecorder.start();
  startRecordButton.disabled = true;
  stopRecordButton.disabled = false;

  // ! callback to tell silence
  // FIXME: how to check silence continuously?
  const checkSilence = () => {
    analyser.getByteTimeDomainData(dataArray); // !  get the time domain data of the audio, FIXME: is this continuous?
    let silent = true;

    console.log("check silence");
    console.log(dataArray);

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
        mediaRecorder.stop(); // ! this stops the recording
      }, 2000); // Stop recording after 2 seconds of silence
    } else {
      clearTimeout(silenceTimeout);
    }

    // requestAnimationFrame(checkSilence);  // this get run on every frame (16,67ms)
  };

  // check silence in an interval FIXME: how to clear the interval?
  interval = setInterval(() => {
    checkSilence();
  }, 3000);
};

stopRecordButton.onclick = () => {
  mediaRecorder.stop(); // ! this stops the recording
  // startRecordButton.disabled = false;
  // stopRecordButton.disabled = true;
  // clearInterval(interval);
};
