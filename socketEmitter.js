const { EventEmitter } = require('events');
const { compose } = require('ramda')

function SocketEmitter() {
  EventEmitter.call(this)
}

SocketEmitter.prototype = new EventEmitter;

const emitter = socketEmitter => msg =>
  socketEmitter.emit(msg.type, msg.data) 


module.exports = (ws) => {
  const socketEmitter = new SocketEmitter();
  const readyState = emitter(socketEmitter)
  ws.on('message', msg => {
    compose(readyState, JSON.parse(msg)) 
  })
  return socketEmitter;
}
