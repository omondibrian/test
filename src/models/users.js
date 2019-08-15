/**
 * @fileOverview  it describes the users schema i.e how data will be structured in 
 * the mongoose database
 * @author Eucossa
 * @version 0.0.1
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    secreateToken:String,
    regNumber:{
        type:String,
        required:true,
        min:12,
        max:15
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    role:{
        type:String,
        default:'normal'
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    password:{
        type:String,
        required:true,
        max:1024,
        min:6
    },
    date:{
        type:Date,
        default:Date.now
    },
    active:{
        type:Boolean,
        default:false
    },
    profileImage:{type:String}
})
module.exports = mongoose.model('User',userSchema)