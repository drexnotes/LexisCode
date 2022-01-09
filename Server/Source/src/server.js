const express = require("express");
const bodyParser = require("body-parser");
const chalk = require('chalk');
const cors = require("cors");
const app = express();
const pack = require("../package");
const path = require("path");
const dotenv = require('dotenv');
const STSServices = require('./services/STSServices');



// Set path to .env file


// if NODE_ENV value not define then dev value will be assign
mode = process.env.NODE_ENV || "dev";
// mode can be access anywhere in the project
const config = require("config").get(mode);
dotenv.config({ path: config.envpath });

//middleware for aws session creation
var requestSession = async function (req, res, next) {
	req.session = await STSServices.createSessionToken({"DurationSeconds": config.sessionDuration})
	next()
  }
app.use(requestSession)

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// use only when you want to see the metric related to express app
// app.use(require('express-status-monitor')());

require("./routes")(app);
// const dir = path.join(__dirname, 'assets');
// app.use('/upload', express.static(dir));
const start = () =>
  app.listen(config.port, () => {
    console.log(chalk.yellow("......................................."));
    console.log(chalk.green(config.name));
    console.log(chalk.green(`Port:\t\t${config.port}`));
    console.log(chalk.green(`Mode:\t\t${config.mode}`));
    console.log(chalk.green(`App version:\t${pack.version}`));
    console.log(chalk.green(`http://localhost:${config.port}/es/search`));
    console.log(chalk.yellow("......................................."));
  });

start();
