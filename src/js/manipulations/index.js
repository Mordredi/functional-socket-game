import { tenSeconds$, click$ } from '../streams'
import { querySelector, getElementById, addClass, replaceElement, querySelectorAll } from '../dom'
import { timer } from '../components/timer'
import { curry, chain, compose } from 'ramda'
import { IO } from 'ramda-fantasy'

export const gameTimer = curry((socket, container) => IO(() => {

  const clickFlickr$ = click$(querySelectorAll('.flickr-image').runIO())
    .map(e => e.target.id)
    .do(e => compose(chain(addClass('selected')), getElementById)(e).runIO())
    .take(1)
  
    tenSeconds$
      .withLatestFrom(
        clickFlickr$
      ) 
      .reduce((acc, x) => x[0] !== 'start' && acc[0] === 'start' ? x : acc)
    .subscribe(
      x => socket.send({type: 'imageSelected', data: { time: x[0], id: x[1]}}),
    )

  tenSeconds$
    .subscribe(
      (number) => {
        replaceElement(timer({number}), querySelector('.timer-number'), container).runIO()
      },
      console.log,
      () => console.log('done!')
    )
}))


