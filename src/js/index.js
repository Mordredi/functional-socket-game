import socketEmitter from '../../socketEmitter'

const ws = new WebSocket(`ws://${window.location.host}/`)

//const socket = socketEmitter(ws);

const form = document.querySelector('#entry');


form.addEventListener('submit', (e) => {
  e.preventDefault();
  ws.send(JSON.stringify({type: 'name', data: form['elements'].name.value}))
})

ws.addEventListener('message', msg => {
  console.log(msg)
})


//socket.on('greeting', data => console.log(data))

//socket.on('users', data => console.log(data))


//socket.on('new user', data => console.log(`new user: ${data}`))

