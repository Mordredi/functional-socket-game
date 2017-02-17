import socketEmitter from '../../socketEmitter'
import { querySelectorAll, querySelector, append, appendTo, removeElement, onSubmit } from './dom'
import { startButton } from './components/startButton'
import { imageContainer } from './components/imageContainer'
import { nameContainer } from './components/nameContainer'
import { timer } from './components/timer'
import { gameTimer } from './manipulations'

const ws = new WebSocket(`ws://${window.location.host}/`)

const body = querySelector('body')

const socket = socketEmitter.browserSocket(ws);

const form = querySelector('#entry')

const formSubmit = (e) => {
  e.preventDefault();
  socket.send({type: 'name', data: e.target.elements.name.value})
}

form
  .chain(onSubmit(formSubmit))
  .runIO();


const startClick = (e) => {
  e.preventDefault();
  socket.send({type: 'start', data: 'start'})
}

const imageClick = id => socket.send({type: 'imageSelected', data: id})

const start = startButton({startClick})

const displayName = (name) => {
  form
    .chain(removeElement)
    .runIO()

  body
    .chain(append(nameContainer({name})))
    .runIO()

  setTimeout(() => {

    querySelector('.name-container')
      .chain(removeElement)
      .runIO()

    body
      .chain(append(start)) 
      .runIO()
  }, 1000)
}

const serverMessages = ({type, data}) => {
  switch (type) {
    case 'greeting':
      return displayName(data)
    case 'roundStart':
      const {round, images} = data;
      if (round === 1) { querySelector('.btn-start').chain(removeElement).runIO() }
      body
        .chain(append(timer({number: 10})))
        .chain(append(imageContainer({images, imageClick})))
        .chain(gameTimer)
        .runIO()
  }
}


socket.listen().fork(console.log, serverMessages)

