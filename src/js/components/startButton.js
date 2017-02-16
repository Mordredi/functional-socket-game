import { createElement, onClick, innerHTML, addClass, setAttribute } from '../dom'

export const startButton = ({startClick}) => createElement('button')
  .chain(innerHTML('Start'))
  .chain(setAttribute({attribute: 'class', value: 'btn btn-start'}))
  .chain(onClick(startClick))
