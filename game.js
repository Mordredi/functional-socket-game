const { getFlickr } = require('./flickr')

const players = {};

const round = 1;

const shuffle = (images) => {
  let m = images.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--); 
    t = images[m]
    images[m] = images[i]
    images[i] = t
  }
  return images
}

const selectImages = curry((x, y, images) => images.slice(x, y))

function Game() {
  this.players = {}
  this.round = 1;
  this.newPlayer = (id, name) => this.players[id] = {name};

  const setImages = (images) => {
    this.images = images;
    return images
  }

  this.start = () =>
    getFlickr()  
      .map(shuffle)
      .map(setImages)
      .map(selectImages(0, 2))
  
}

const startGame = () => new Game()

module.exports = {
  startGame
}
