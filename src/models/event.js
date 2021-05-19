const mongoose = require('mongoose');

//CREATE SCHEMA
const eventSchema = new mongoose.Schema({
    id: Number,
    title: String,
    cost: {
        type: Number,
        required: true,
        min: [1, 'Must be greater than 0, got {VALUE}']
    },
    category: {
        type: String,
        enum: ["business", "casual", "party", "general"],
        default: "business"
    }
})
const Event = mongoose.model('event', eventSchema);

module.exports = Event;
