const request = require('request')
const Task = require('data.task');

const httpGet = url => 
  new Task((reject, resolve) => 
  request(url, (error, response, body) => 
    error ? reject(error) : resolve(body)))

module.exports = {
  httpGet
}
