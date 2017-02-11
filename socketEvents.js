const Task = require('data.task');
const { parse } = require('./utils');
const { getFlickr } = require('./flickr');
const socketEmitter = require('./socketEmitter')

const startGame = (ws) => 
  getFlickr()
    .map(JSON.stringify)
    .fork(console.log, function(res) {
    ws.send(res)
    })
 

module.exports = (ws) => {
  const socketEvents = socketEmitter(ws)
  socketEvents.on('name', data => {
    console.log(data) 
  })
    //var message = parse(msg).get()
    //message.data.name ? ws.send(`hello ${message.data.name}`) : startGame(ws)
}
