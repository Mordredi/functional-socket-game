import { createElement, addClass, innerHTML } from '../dom'

export const timer = ({number}) => 
  createElement('section')
    .chain(addClass('timer-number'))
    .chain(innerHTML(number))
   
