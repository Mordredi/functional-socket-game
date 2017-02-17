import { createElement, setAttribute, addClass } from '../dom'


export const flickrImage = ({id, farm, server, secret, title}) => {
  const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
  return createElement('img')
    .chain(setAttribute({attribute: 'src', value: url}))
    .chain(setAttribute({attribute: 'id', value: id}))
    .chain(addClass('flickr-image'))
    .chain(setAttribute({attribute: 'alt', value: title}))
}
