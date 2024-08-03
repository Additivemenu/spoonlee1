// Get references to UI elements
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const audioPlayback = document.getElementById("audioPlayback");

let mediaRecorder;
let audioChunks = []; // ! Store the audio data chunks when they are available

// Start recording when the user clicks the "Start Recording" button
startBtn.addEventListener("click", async () => {
  // Request access to the microphone
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  // Create a MediaRecorder instance
  mediaRecorder = new MediaRecorder(stream);

  // Start recording
  mediaRecorder.start();
  startBtn.disabled = true;
  stopBtn.disabled = false;

  // ! Store the audio data chunks when they are available
  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  };

  // When the recording is stopped, create an audio Blob and set it as the source of the audio element
  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    audioChunks = []; // Reset the chunks array

    // Create a URL for the audio blob and set it as the audio source
    const audioUrl = URL.createObjectURL(audioBlob);
    audioPlayback.src = audioUrl;   // ! feed the audio to the audio element

    startBtn.disabled = false;
    stopBtn.disabled = true;
  };
});

// Stop recording when the user clicks the "Stop Recording" button
stopBtn.addEventListener("click", () => {
  mediaRecorder.stop();
});
