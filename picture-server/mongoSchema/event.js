const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    dateOfEvent: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    img: {
        type: Array
    },
    tagPeople: {
        type: Array
    },
    userId: {
        required: true,
        type: String
    },
    requestsPending: {
        type: Array
    },
    approvedRequests: {
        type: Array
    },
    private: {
        required: true,
        type: Boolean
    }

})

module.exports = EventModel = mongoose.model('events', EventSchema)