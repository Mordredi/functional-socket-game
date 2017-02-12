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
 
const users = [] 

const emit = ws => msg => ws.send(JSON.stringify(msg))

const broadcast = users => msg => users.forEach(user => emit(user.connection)(msg)) 

module.exports = (ws) => {
  const uid = Math.random().toString(36).substr(2, 16); 
  ws.id = uid;

  const socketEvents = socketEmitter(ws, 'server')

  const send = emit(ws);
  ws.on('close', () => {
     console.log(ws.id)
     console.log('closed')
  });

  socketEvents.on('name', data => {
    broadcast(users)({type: 'new user', data})
    const user = {
      name: data,
      connection: ws
    }
    users.push(user)
    send({type: 'greeting', data: `Hello ${data}`});
    send({type: 'users', data: users.map(user => user.name)})
  })
    //var message = parse(msg).get()
    //message.data.name ? ws.send(`hello ${message.data.name}`) : startGame(ws)
}
