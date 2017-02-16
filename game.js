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

const startGame = () => {
  return getFlickr()
    .map(shuffle)
}

module.exports = {
  startGame
}
