const path = require("path");
const express = require("express"); // hold cmd to see source code
const bodyParser = require("body-parser");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // register request body parser
app.use(express.static(path.join(__dirname, "public")));

// routes handling middleware ---------------
app.use("/admin", adminData.routes);
app.use(shopRoutes);

// page not found middleware
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
