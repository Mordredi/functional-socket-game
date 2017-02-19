import { tenSeconds$, click$ } from '../streams'
import { querySelector, replaceElement, querySelectorAll } from '../dom'
import { timer } from '../components/timer'
import { IO } from 'ramda-fantasy'
import { Observable } from 'rxjs/Rx'


export const gameTimer = container => IO(() => {

  const flickrClick$ = click$(querySelectorAll('.flickr-image').runIO())
    .map(e => e.target.id)
    .take(1)
    .map(x => {
      console.log(`click ${x}`)
      return x
    }
    )

  tenSeconds$
    .map(number => {
      console.log(`timer ${number}`)
      replaceElement(timer({number}), querySelector('.timer-number'), container).runIO()
    })


  Observable.combineLatest(
    tenSeconds$,
    flickrClick$,
    (number, id) => ({number, id})

  )
    .subscribe(
      ({number, id}) => {
        console.log(number, id)
      },
      console.log,
      (x) => console.log(x)
    )
})


