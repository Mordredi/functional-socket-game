const Task = require('data.task');
const Either = require('data.either');

const parse = Either.try(JSON.parse)
const stringify = Either.try(JSON.stringify)

const eitherToTask = e => 
  e.fold(Task.reject, Task.of)

module.exports = {
  parse,
  eitherToTask,
  stringify
}
