const Task = require('data.task');
const { parse } = require('./utils');
const socketEmitter = require('./socketEmitter')
const { startGame } = require('./game')

 
module.exports = (ws) => {
  const socket = socketEmitter.serverSocket.addSocket(ws)
  const serverMessages = ({type, data}) => {
    switch (type) {
      case 'name':
        return socket.emit({type: 'greeting', data: `Hello ${data}`})
      case 'start':
        startGame() 
          .fork(console.log, (data) => {
            console.log(data)
            socket.broadcast({type: 'round1', data}) 
          })
        break
      case 'imageSelected':
        console.log(socket)
        console.log(`data: ${data}`)
    }
  }

  socket.listen().fork(console.log, serverMessages)
}

