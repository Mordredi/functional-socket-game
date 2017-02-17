import { IO, Maybe } from 'ramda-fantasy'
import { compose, map, curry } from 'ramda'
import Either from 'data.either'

export const querySelectorAll = selector => IO(() => document.querySelectorAll(selector));

export const querySelector = selector => IO(() => document.querySelector(selector))

export const append = curry((elem, container) => IO(() => {
  container.append(elem.runIO()) 
  return container
}))

export const replaceElement = curry((newElem, oldElem, container) => IO(() => 
  container.replaceChild(newElem.runIO(), oldElem.runIO())
))

export const appendTo = curry((container, elem) => IO(() => container.append(elem)))

export const createElement = elem => IO(() => document.createElement(elem))

export const removeElement = elem => IO(() => 
  elem.remove()
)

export const addEventListener = curry((event, f, elem) => IO(() => elem.addEventListener(event, f)))

export const addClass = curry((className, elem) => IO(() => {
  elem.classList.add(className)
  return elem
}))

export const removeClass = curry((className, elem) => IO(() => {
  elem.classList.remove(className)
  return elem
}))

export const setAttribute = curry((attr, elem) => IO(() => { 
  elem.setAttribute(attr.attribute, attr.value)
  return elem
}))

export const onClick = curry((f, elem) => IO(() => {
  elem.onclick = f
  return elem
}))

export const onSubmit = curry((f, elem) => IO(() => {
  elem.onsubmit = f
  return elem
}))

export const innerHTML = curry((html, elem) => IO(() => {
  elem.innerHTML = html
  return elem
}))

