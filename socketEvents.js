const Task = require('data.task');
const { curry } = require('ramda');
const { parse } = require('./utils');
const socketEmitter = require('./socketEmitter')

module.exports = curry((game, ws) => {
  const socket = socketEmitter.serverSocket.addSocket(ws)
  const serverMessages = ({type, data}) => {
    switch (type) {
      case 'name':
        game.newPlayer(ws.id, data)
        return socket.emit({type: 'greeting', data: `Hello ${data}`})
      case 'start':
        game
          .start()
          .fork(console.log, (data) => {
            socket.broadcast({type: 'roundStart', data: { images: data, round: 1}}) 
          })
        break
      case 'imageSelected':
        console.log(socket)
        console.log(`data: ${data.id}`)
    }
  }

  socket.listen().fork(console.log, serverMessages)
})

