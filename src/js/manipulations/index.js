import { tenSeconds$, click$ } from '../streams'
import { querySelector, replaceElement, querySelectorAll } from '../dom'
import { timer } from '../components/timer'
import { IO } from 'ramda-fantasy'
import { Observable } from 'rxjs/Rx'

const flickrClick$ = click$(querySelectorAll('.flickr-image').runIO())
    //.map(e => e.target.id)
    //.take(1)

export const gameTimer = container => IO(() => {
  Observable.combineLatest(
    tenSeconds$,
    flickrClick$
  )
    .subscribe(
      (x) => {
        console.log(x)

        return replaceElement(timer({number: x.number}), querySelector('.timer-number'), container).runIO()},
      console.log,
      (x) => console.log(x)
    )
})


