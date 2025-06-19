// require('dotenv').config()

// const express = require('express')
// const mongoose = require('mongoose')
// const blogroute = require('./routes/Blogs')

// //express app
// const app = express()

// //middleware
// app.use(express.json())

// app.use((req,res,next)=>{
//     console.log(req.path,req.method)
//     next()
// })

// app.use('/api/blogs',blogroute)


// //connect to db
// mongoose.connect(process.env.MONG_URI)
// .then(()=>{
//     //listen to the port
//     console.log("Connected to Database....")
//     app.listen(process.env.PORT,()=>{
//         console.log("Listening to port 4000....")
//     })

// })
// .catch((error)=>{
//     console.log("Error occured...")
//     console.log(error)
// })




require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');
const blogroute = require('./routes/Blogs');
const authroute = require('./routes/auth'); // 

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
