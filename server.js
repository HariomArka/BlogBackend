require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');
const blogroute = require('./routes/Blogs');
const authroute = require('./routes/auth'); 
const mailRoutes = require('./routes/mail'); 

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/blogs', blogroute);
app.use('/api/auth', authroute);
app.use('/api', mailRoutes);


// connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        console.log("Connected to Database....");
        app.listen(process.env.PORT, () => {
            console.log("Listening to port", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log("Error occurred...");
        console.log(error);
    });
