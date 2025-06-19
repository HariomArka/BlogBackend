const mongoose = require('mongoose')

const schema = mongoose.Schema

const blogSchema = new schema({
    title:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    choice:{
        type: String,
        default: 'public',
        required: true
    },
    description:{
        type: String,
        required: true
    },
    likes:{
        type: Number,
        default: 0
    },
    author:{
        type: String,
        required: false
    },
    comments:{
        type: [String], // Array of comment strings
        default: []     // Initialize as empty array
    }
},{timestamps:true})

module.exports = mongoose.model('Blog',blogSchema)