const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// cors
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type, Authorization");
    next();
});

// api routes
app.use("/", require("./app/routes/routes"));

app.listen(process.env.PORT, () => {
    console.log(`server running at port ${process.env.PORT}`)
});