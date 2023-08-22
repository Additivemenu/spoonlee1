const path = require("path");
const express = require("express"); // hold cmd to see source code
const bodyParser = require("body-parser");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

// like appliaction.properties
app.set('view engine', 'pug');  // tell express we are gonna use pug as template engine
app.set('views', 'views')  // tell express where to find the views


app.use(bodyParser.urlencoded({ extended: false })); // register request body parser
app.use(express.static(path.join(__dirname, "public")));

// routes handling middleware ---------------
app.use("/admin", adminData.routes);
app.use(shopRoutes);

// page not found middleware
app.use((req, res, next) => {
  res.status(404).render('404', {pageTitle: 'Page Not Found'});
});

app.listen(3000);
