const Task = require('data.task');
const parse = require('./utils').parse
const getFlickr = require('./flickr').getFlickr;

const startGame = (ws) => 
  getFlickr()
    .map(JSON.stringify)
    .fork(console.log, function(res) {
    ws.send(res)
    })
 

module.exports = (ws) => {
  ws.on('message', msg => {
    var message = parse(msg).get()
    message.data.name ? ws.send(`hello ${message.data.name}`) : startGame(ws)
  })
}
