import { Observable } from 'rxjs/Rx'
import { curry, subtract } from 'ramda'

export const timer$ = curry((interval, count) => 
  Observable.interval(interval)
    .map(subtract(count - 1))
    .take(count)
)

export const click$ = selector => Observable.fromEvent(selector, 'click')
 
export const seconds$ = timer$(1000)

export const tenSeconds$ = seconds$(10)

export const threeSeconds$ = seconds$(3)

