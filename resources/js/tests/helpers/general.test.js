import { capitalize, displayNumber } from '../../helpers/general.helper'

describe('General helpers', () => {
  it('Capitalizes a string', () => {
    const str = 'lower case'
    expect(capitalize(str)).toBe('Lower case')
  })
  it('displayNumber formats a float with 2 decimals', () => {
    const amount = 200.12
    expect(displayNumber(amount)).toBe('200.12')
  })
  it('displayNumber formats a float with 2 decimals unit of 10', () => {
    const amount = 200.1
    expect(displayNumber(amount)).toBe('200.10')
  })
  it('displayNumber formats a float with no decimals', () => {
    const amount = 200
    expect(displayNumber(amount)).toBe('200.00')
  })
})
