import { createElement, innerHTML, addClass } from '../dom'

export const nameContainer = ({name}) =>
  createElement('section')
    .chain(innerHTML(`<h1>${name}</h1>`))
    .chain(addClass('name-container'))

