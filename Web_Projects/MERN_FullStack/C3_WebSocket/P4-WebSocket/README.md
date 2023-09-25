this one is runnable


server 

```ts
mkdir websocket-server
cd websocket-server
npm init -y
npm install express ws http

```


client

```ts
npx create-react-app websocket-client
cd websocket-client
npm install reconnecting-websocket
```

When you run both the server and client, you can type messages in the React app's input field and send them to the server, which then echoes a greeting back to the client. The messages from the server will be displayed in a list on the client side.