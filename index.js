const express = require("express");
const errorHandler = require("./middleWare/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const app=express();

const port=  process.env.PORT|| 5500;

connectDb();
app.use(express.json());

app.use("/api/contacts", require("../route/contactRoutes"));
app.use(errorHandler)
app.listen(port, ()=>{
    console.log(`listening on port http://127.0.0.1:${port}`);
});