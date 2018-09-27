require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const compression = require("compression");
const mongoose = require("mongoose");
const fs = require("fs");
const fileUpload = require("express-fileupload");

const apiRoutes = require("./routes/api");
const appRoutes = require("./routes/app");

mongoose.Promise = Promise;
mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const server = express();

server.use(helmet());
server.use(morgan("dev"));
server.use(compression());
server.use(fileUpload());
server.use(bodyParser.json());
favicon = require("serve-favicon");

if (!process.env.IS_PRODUCTION) {
  server.use(express.static(path.join(__dirname, "../../dist")));
}

server.use(express.static(path.join(__dirname, "public")));
server.use(favicon(__dirname + "/public/favicon.ico"));
server.use("/api", apiRoutes);
server.use(appRoutes);

// mongoose.connection.on('connected', () => {
//     console.log(chalk.blue.bold('Connected to Mongo!'))

//     // this is sometimes necessary to prevent mongoose errors
//     const dir = fs.readdirSync(path.join(__dirname, './models'))
//     dir.forEach(model => require(`./models/${model}`))

server.listen(process.env.PORT, () => {
  console.log("Server is up and running: http://localhost:" + process.env.PORT);
});
