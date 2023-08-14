const http = require("http"); // look for a local file named 'http.js'
const fs = require("fs");
const routes = require("./routes");

console.log(routes.someTextL);
const server = http.createServer(routes.handler);

server.listen(3000);
