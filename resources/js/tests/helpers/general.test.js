import { capitalize, displayCash } from '../../helpers/general.helper'

describe('General helpers', () => {
  it('Capitalizes a string', () => {
    const str = 'lower case'
    expect(capitalize(str)).toBe('Lower case')
  })
  it('displayCash formats a float with 2 decimals', () => {
    const amount = 200.12
    expect(displayCash(amount)).toBe('200.12')
  })
  it('displayCash formats a float with 2 decimals unit of 10', () => {
    const amount = 200.1
    expect(displayCash(amount)).toBe('200.10')
  })
  it('displayCash formats a float with no decimals', () => {
    const amount = 200
    expect(displayCash(amount)).toBe('200.00')
  })
})
