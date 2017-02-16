import { createElement, setAttribute, onClick } from '../dom'


export const flickrImage = ({id, farm, server, secret, title, imageClick}) => {

  const onImageClick = () => imageClick(id)

  const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
  return createElement('img')
    .chain(setAttribute({attribute: 'src', value: url}))
    .chain(setAttribute({attribute: 'alt', value: title}))
    .chain(onClick(onImageClick))
}
