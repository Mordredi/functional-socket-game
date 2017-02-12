const { httpGet } = require('./http');
const { parse, eitherToTask } = require('./utils');

const apiKey = '25ab953a12c6d2a43a4d449ecccad389'

const getFlickr = () => httpGet(`https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${apiKey}&user_id=132365033@N08&format=json&nojsoncallback=1`)
  .map(parse)
  .chain(eitherToTask)
  .map(results => results.photos.photo)

module.exports = {
  getFlickr
}
