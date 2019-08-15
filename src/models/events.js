const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },
    description: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },
    image: {
        type: String,
        required: true,
    },
    confirm: {
        type: String,
        
    }
})

const Events = mongoose.model('Event', eventSchema);
module.exports = Events;