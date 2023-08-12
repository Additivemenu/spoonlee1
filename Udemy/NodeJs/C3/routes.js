const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  // when click on Send button on the page of localhost:3000, direct to here
  if (url === "/message" && method === "POST") {
    const body = [];

    // callback is fisrtly registered, then run on every incoming data
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    // callback is firstly registered
    return req.on("end", () => {
      // parse
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];

      fs.writeFile("message.txt", message, (err) => {
        // callback runs onError or done writing the file
        res.statusCode = 302;
        res.setHeader("Location", "/"); // after the POST request is processed, the client will be redirected to the server's root URL.
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js server!</h1></body>");
  res.write("</html>");

  res.end(); // stop writing response
};

// 写法1
// module.exports = requestHandler;

// 写法2
module.exports = {
    handler: requestHandler,
    someTextL: 'some hard coded text'
};

// 写法3
// module.exports.handler = requestHandler;
// module.exports.someText = 'some hard coded text';
// // shortcut
// exports.handler = requestHandler;
// exports.someText = 'some hard coded text';

