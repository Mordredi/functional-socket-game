const { EventEmitter } = require('events');
const { compose } = require('ramda')

function SocketEmitter() {
  EventEmitter.call(this)
}

SocketEmitter.prototype = new EventEmitter;

const emitter = socketEmitter => msg => {
  socketEmitter.emit(msg.type, msg.data) 
}

module.exports = (ws, type) => {
  const socketEmitter = new SocketEmitter();
  const readyState = emitter(socketEmitter)
  type === 'server' 
    ? ws.on('message', msg =>
      readyState(JSON.parse(msg)))
    : ws.addEventListener('message', msg =>  
      readyState(JSON.parse(msg.data)))
  return socketEmitter;
}
