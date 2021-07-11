const mongoose = require('mongoose')

const DefaultPicturesSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }

})

module.exports = PicturesModel = mongoose.model('defaultEventPictures', DefaultPicturesSchema)