import { createElement, setAttribute, append } from '../dom'
import { flickrImage } from './flickrImage'
import { compose, chain, reduce, map } from 'ramda'

const appendToContainer = reduce((a, b) =>
  a.map(append(b)).runIO()
)

const mapImages = (images, imageClick) => images.map(({id, secret, farm, server, title})=> flickrImage({id, secret, farm, server, title, imageClick}))

export const imageContainer = ({images, imageClick}) => {
  const container = compose(chain(setAttribute({attribute: 'class', value: 'image-container'})), createElement)('section')
  return appendToContainer(container)(mapImages(images, imageClick))
}

