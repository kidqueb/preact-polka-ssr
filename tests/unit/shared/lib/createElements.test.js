import { h } from 'preact'

import createElements from '~/shared/lib/createElements'

describe('shared/lib/createElements', () => {
  it('should return an empty array if no tags are included', () => {
    const tags = []
    expect(createElements(tags)).toEqual([])
  })

  it('should return an array of one el with no attrs if they arent included', () => {
    const tags = [{ name: 'meta' }]
    const meta = document.createElement('meta')
    expect(createElements(tags)).toEqual([meta])
  })

  it('should return an array of one el with attrs if they are included', () => {
    const tags = [{ name: 'meta', attrs: { test: 'yay' } }]

    const meta = document.createElement('meta')
    meta.setAttribute('test', 'yay')

    expect(createElements(tags)).toEqual([meta])
  })

  it('should return an array of multiple elements', () => {
    const tags = [
      { name: 'meta', attrs: { test: 'yay' } },
      { name: 'meta', attrs: { another: true } }
    ]

    const m1 = document.createElement('meta')
    m1.setAttribute('test', 'yay')

    const m2 = document.createElement('meta')
    m2.setAttribute('another', true)

    expect(createElements(tags)).toEqual([m1, m2])
  })
})
