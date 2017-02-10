var form = document.querySelector('.entry-form');
var socket = new WebSocket('ws://' + window.location.host + '/')

socket.addEventListener('open', function(m) {
  console.log('open')
});

socket.addEventListener('message', function(m) {
  console.log(m)
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log(form.elements['name'].value)
})

