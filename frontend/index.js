const express = require('express');
const path = require('path');
const app = express();
const authRouter = require( './routers/auth');
const mainRouter = require( './routers/main');
const config = require("./config.json");

const PORT = config.port;

app.use(express.static("./public/images"));
app.use(express.static("./public/styles"));
app.use(express.static("./public/scripts"));

app.use(express.urlencoded({extended: true}));

app.use("/", authRouter);
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});