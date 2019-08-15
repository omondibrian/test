const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modulesSchema = new Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:30
    },
    description: {
        type: String,
        required: true,
        min: 6,
        max: 30},
    fee: {
        type: String,
        required: true
       },
    image: {
        type: String,
        required: true,
        },
        registrationLink:{
            type:String,
            required: true,
        }
})

const Module = mongoose.model('module', modulesSchema);
module.exports = Module;