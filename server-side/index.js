const express = require('express')
const app = express()
const http = require('http');
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const tagUsers = require('./routs/tagSocket')
const registration = require('./routs/registration')
const pics = require('./routs/pics')
const event = require('./routs/event')
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

const conectionDb = require('./mongodB')
conectionDb()
app.use(cors())

app.use(express.json({ extended: false }))
app.use(bodyParser.json())

app.use('/events', event)
app.use('/pics', pics)
app.use('/registration', registration)
app.use('/socket', tagUsers)




server.listen(process.env.PORT, () => {
    console.log("server is runing")
})

