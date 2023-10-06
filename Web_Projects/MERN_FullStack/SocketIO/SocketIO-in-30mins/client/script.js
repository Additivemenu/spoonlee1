import { io } from "socket.io-client";

const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");

// ! ---------------------------------------------
// -----
const socket = io("http://localhost:3000"); // ! get the socket object from the server
socket.on("connect", () => {
  // runs when the client connects to the server
  displayMessage(`You are connected, socket id: ${socket.id}`);
});
socket.on("receive-message", (message) => {
  displayMessage(message);
});

// -----
// get the socket object from the server, corresponding to `userIo.on("connection", ()=>{})` on server
// we can also attach a token to the handshake on connection, so that the server can verify the user
const userSocket = io("http://localhost:3000/user", {
  auth: { token: "Test" },
});
userSocket.on("connect_error", (err) => {
  displayMessage(err.message);
});
// ! ---------------------------------------------

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;

  if (message === "") return;

  displayMessage(message);
  socket.emit("send-message", message, room); // ! send message to room

  messageInput.value = "";
});

joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value;
  // ! here we pass a callback to server, but note it has to be the last argument
  socket.emit("join-room", room, (message) => {
    displayMessage(message);
  });
});

// display a message in display area
function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.getElementById("message-container").append(div);
}

// socket connect disconnect demo ---------------------------------------------
// by default, socket io store all states when disconnected, when you re-connected to the server, it will send all the states back to you at once
let count = 0;
setInterval(() => {
  socket.volatile.emit("ping", ++count);
}, 1000); 

document.addEventListener("keydown", (e) => {
  if (e.target.matches("input")) return;

  if (['c', 'C'].includes(e.key)) socket.connect();
  if (['d', 'D'].includes(e.key)) socket.disconnect();
});
