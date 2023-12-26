const express = require('express');
const path = require('path');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const authRouter = require( './routers/auth');
const dishRouter = require( './routers/dish');
const drinkRouter = require( './routers/drink');
const orderRouter = require( './routers/order');
const restaurantAddressRouter =  require( './routers/restaurantAddress');
const config = require("./config.json");

const PORT = config.port;

app.use(express.static("./public/images"));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: "http://localhost:8000",
}));
app.use(express.urlencoded({extended: true}));

app.use("/api/auth", authRouter);
app.use("/api/dish", dishRouter);
app.use("/api/drink", drinkRouter);
app.use("/api/order", orderRouter);
app.use("/api/restaurantAddress", restaurantAddressRouter);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});