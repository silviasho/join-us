const http = require('http');
const express = require('express');

const socketio = require('socket.io');
const tagUsers = express();
const server = http.createServer(tagUsers);
const io = socketio(server);




tagUsers.get('/tag', async (req, res, next) => {
  

})
module.exports = tagUsers