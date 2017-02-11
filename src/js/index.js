import socketEmitter from '../../socketEmitter'


const socket = new WebSocket(`ws://${window.location.host}/`)

//const socketEvents = socketEmitter(socket);

const form = document.querySelector('#entry');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.send(JSON.stringify({type: 'name', data: form['elements'].name.value}))
})

//socket.addEventListener('open', () => {
  //socket.send('woot') 
//})

//socketEvents.on('works', data => {
  //console.log(data)
//})

