const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moduleSchema = new Schema({
    

    first:{
        type:Number,
       
    },
    second:{
        type:Number,
       
    },
    third:{
        type:Number,
       
    },
    fourth:{
        type:Number,
       
    },
})
const moduleRegistrationSchema = new Schema({
    label: {
        type: String,
        required: true
    }
    ,
    data:[moduleSchema]
})
const moduleRegistration = mongoose.model('moduleRegistration', moduleRegistrationSchema);
module.exports = moduleRegistration;