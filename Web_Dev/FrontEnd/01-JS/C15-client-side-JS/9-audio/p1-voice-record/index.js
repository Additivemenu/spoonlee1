// integrate with OpenAI whisper model for audio -> text
import OpenAI from "openai";
const openai = new OpenAI();

async function transcribeAudioWithWhisper() {
  console.log("transcribe audio with whisper");

  // const transcription = await openai.audio.transcriptions.create({
  //   file: fs.createReadStream("audio.mp3"),
  //   model: "whisper-1",
  // });

  // console.log(transcription.text);
  // return transcription.text;
}



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
  mediaRecorder.onstop = async () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/mp3" }); // ! chunk data to blob obj

    // Create a URL for the audio blob and set it as the audio source
    const audioUrl = URL.createObjectURL(audioBlob);
    audioPlayback.src = audioUrl; // ! feed the audio to the audio element

    // TODO:  integrate with OpenAI whisper model for audio -> text
    transcribeAudioWithWhisper();

    // // Create a new FormData object
    // const formData = new FormData();

    // // Append the audioBlob to the FormData object with a key, here "audioFile"
    // formData.append("audioFile", audioBlob, "recording.mp3");  // remember file needs to be in binary format in request body

    // // Send the FormData to the server using fetch
    // fetch("https://your-server.com/upload", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       console.log("Audio file uploaded successfully");
    //     } else {
    //       console.error("Failed to upload audio file");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error uploading audio file:", error);
    //   });

    // final cleanup
    audioChunks = []; // Reset the chunks array
    startBtn.disabled = false;
    stopBtn.disabled = true;
  };
});

// Stop recording when the user clicks the "Stop Recording" button
stopBtn.addEventListener("click", () => {
  mediaRecorder.stop(); // -> triggers the onstop event
});
