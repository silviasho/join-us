 const express = require('express')
 const app = express()
const http = require('http');
require('dotenv').config()
const socketio = require('socket.io');
 const server = http.createServer(app);
 const io = socketio(server);
const { searchUsers } = require('./utils/findUser')




io.on('connect', async (socket) => {

    socket.on("tagValue", async (inputValue, callback) => {
        const tagResault = await searchUsers(inputValue)
        if (!tagResault) {
            return
        } else {
            return callback({ res: tagResault })
        }
    })
    socket.on('disconnect', () => {
        console.log("disconnect socket")
    })
});


server.listen(process.env.PORT, () => {
    console.log("server is runing")
})

