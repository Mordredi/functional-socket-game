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
  const socket = socketEmitter.addSocket(ws)
  const serverMessages = ({type, data}) => {
    switch (type) {
      case 'name':
        socket.emit({type: 'greeting', data: `Hello ${data}`})
        break
    }
  }

  socket.listen().fork(console.log, serverMessages)
}

