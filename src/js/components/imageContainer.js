import { createElement, setAttribute, append } from '../dom'
import { flickrImage } from './flickrImage'
import { compose, chain, reduce, map } from 'ramda'

const appendToContainer = reduce((a, b) =>
  a.map(append(b)).runIO()
)

const mapImages = map(flickrImage)

export const imageContainer = ({images}) => {
  const container = compose(chain(setAttribute({attribute: 'class', value: 'image-container'})), createElement)('section')
  return appendToContainer(container)(mapImages(images))
}

