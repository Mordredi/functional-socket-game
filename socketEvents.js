const Task = require('data.task');
const { parse } = require('./utils');
const { getFlickr } = require('./flickr');
const socketEmitter = require('./socketEmitter')

 
module.exports = (ws) => {
  const socket = socketEmitter.serverSocket.addSocket(ws)
  const serverMessages = ({type, data}) => {
    switch (type) {
      case 'name':
        return socket.emit({type: 'greeting', data: `Hello ${data}`})
      case 'start':
        getFlickr()
          .fork(console.log, (data) => {
            socket.broadcast({type: 'round1', data}) 
          })
    }
  }

  socket.listen().fork(console.log, serverMessages)
}

