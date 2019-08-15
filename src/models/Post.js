/**
 * @fileOverview It describes the basic structure/schema of the posts collection
 * @author Eucossa
 * @version 0.0.1
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    title:{
        type:String,
        required:true,
        min:7,
        max:50
    },
    imageUrl:{
        type:String,
              
    },
    mainContent:{
        type:String,
        required:true,
        min:7,
    },
    userId:{
        type:String,
        required:true
    }
})

const Post = mongoose.model('post', postSchema);
module.exports = Post;