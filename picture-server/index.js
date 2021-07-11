const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const { userFileName ,userFileNameById} = require('./utils/findUser')
const fs = require("fs")
const conectionDb = require('./mongodB')
conectionDb()
const PicturesModel = require('./mongoSchema/defaultEventPictures')
app.use(cors())
app.use(bodyParser.json())

app.get('/pictureByToken/:token', async (req, res, next) => {
    try {
        const { token } = req.params
        const fileName = await userFileName(token)
        console.log(fileName)
        fs.readFile(`${__dirname}/Pictures/${fileName}`, (err, data) => {
            console.log(data)
            if (err) throw err;
            res.end(data)
        });
    } catch (err) {
        console.log(err.message)
        return res.json({ err: "no image" }).status(400)
    }
})

app.get('/userProfilePicture/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params
        const fileName = await userFileNameById(userId)
        fs.readFile(`${__dirname}/Pictures/${fileName}`, (err, data) => {
            if (err) throw err;

            res.end(data)
        });
    } catch (err) {
        
        return res.json({ err: "no image" }).status(400)
    }
})

app.get('/eventDefaultPicture/:eventCategory', async (req, res, next) => {
    try {
        console.log(1)
       const {eventCategory}= req.params
       const [defaultPicture] = await PicturesModel.find({category:eventCategory})
const {fileName}=defaultPicture
        fs.readFile(`${__dirname}/defultEventPicturs/sport/${fileName}`, (err, data) => {
            if (err) throw err;
            res.end(data)
        });
    } catch (err) {
        console.log(err.message)
        return res.json({ err: "no image" }).status(400)
    }
})

app.get('/userEvetPicture/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params
       
        const fileName = await userFileNameById(userId)
        fs.readFile(`${__dirname}/Pictures/${fileName}`, (err, data) => {
            if (err) throw err;
            res.end(data)
        });
    } catch (err) {
        return res.json({ err: "no image" }).status(400)
    }
})


app.listen(process.env.PORT, () => {
    console.log(process.env.PORT)
})