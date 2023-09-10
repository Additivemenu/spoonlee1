a chat app
+ express
+ web socket
+ http

```console
npm install express socket.io http
```

In this example:

The server sets up a basic Express app with socket.io for WebSocket communication.
When a user connects, the server listens for 'chat message' events from that user and broadcasts the message to all connected users.
On the client side, an HTML form allows users to type and send messages. When a message is sent, it emits a 'chat message' event to the server with the message content.
The client also listens for 'chat message' events from the server to display incoming messages.
This is a very basic chat app without features like user authentication, message persistence, or multiple chat rooms. However, it provides a foundation upon which you can build more complex chat applications.
