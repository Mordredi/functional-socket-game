import socketEmitter from '../../socketEmitter'

const ws = new WebSocket(`ws://${window.location.host}/`)

const socket = socketEmitter.browserSocket(ws);

const form = document.querySelector('#entry');


form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.send({type: 'name', data: form['elements'].name.value})
})

socket.listen().fork(console.log, console.log)


//socket.on('greeting', data => console.log(data))

//socket.on('users', data => console.log(data))


//socket.on('new user', data => console.log(`new user: ${data}`))

