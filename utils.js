const request = require('request')
const Task = require('data.task');
const Either = require('data.either');

const parse = Either.try(JSON.parse)
const stringify = Either.try(JSON.stringify)

const eitherToTask = e => 
  e.fold(Task.reject, Task.of)

const httpGet = url => 
  new Task((reject, resolve) => 
  request(url, (error, response, body) => 
    error ? reject(error) : resolve(body)))


module.exports = {
  parse,
  eitherToTask,
  httpGet,
  stringify
}
