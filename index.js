const express = require('express');
const jsonwebtoken=require('jsonwebtoken');
const mongoose=require('mongoose');

const {userRouter} = require('./routes/user');
const { courseRouter} = require('./routes/course');
const  {adminRouter} = require('./routes/admin');

const app= express();

app.use("/api/v1/user" ,userRouter);
app.use("/api/v1/course" ,courseRouter);
app.use("/api/v1/admin" ,adminRouter);


app.listen(3000);