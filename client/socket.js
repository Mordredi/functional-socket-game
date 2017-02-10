var button = document.querySelector('.name');
var start = document.querySelector('.start');
var socket = new WebSocket('ws://' + window.location.host + '/')

socket.addEventListener('open', function(m) {
  console.log('open')
});

socket.addEventListener('message', function(m) {
  console.log(m)
});

start.addEventListener('click', function(e) {
  e.preventDefault()
  socket.send(JSON.stringify({data: {start: true}}))
});

button.addEventListener('click', function(e) {
  e.preventDefault();
  socket.send(JSON.stringify({data: {name: 'Arthur'}}));
});
  
