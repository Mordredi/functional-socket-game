const { EventEmitter } = require('events');
const { compose } = require('ramda')
const Task = require('data.task')

function SocketEmitter() {
  EventEmitter.call(this)
}

SocketEmitter.prototype = new EventEmitter;

const emitter = socketEmitter => msg => {
  socketEmitter.emit(msg.type, msg.data) 
}


function ServerSocket(ws, sockets) {
  this.ws = ws;
  this.sockets = sockets;
  this.emit = (msg) => this.ws.send(JSON.stringify(msg))
  this.broadcast = (msg) => this.sockets.forEach(socket => socket.send(JSON.stringify(msg)))
  this.listen = () => new Task((rej, res) => ws.on('message', msg => res(JSON.parse(msg))))
}

const serverSocket = {
  sockets: [],
  addSocket(ws) {
    const uid = Math.random().toString(36).substr(2, 16); 
    ws.id = uid;
    this.sockets.push(ws);
    return new ServerSocket(ws, this.sockets)
  }
}

function BrowserSocket(ws) {
  this.ws = ws;
  this.send = (msg) => this.ws.send(JSON.stringify(msg))
  this.listen = () => new Task((rej, res) => ws.addEventListener('message', msg => res(JSON.parse(msg.data))))
}

const browserSocket = (ws) => new BrowserSocket(ws)

module.exports = {
  browserSocket,
  serverSocket
}
