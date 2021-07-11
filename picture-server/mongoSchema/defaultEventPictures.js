const mongoose = require('mongoose')

const DefaultPicturesSchema = new mongoose.Schema({
    fileName: {
        type: String,
      
    },
    category: {
        type: String,
        required: true
    }

})

module.exports = PicturesModel = mongoose.model('defaultEventPictures', DefaultPicturesSchema)