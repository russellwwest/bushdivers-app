import React from 'react'
import { render, screen } from '@testing-library/react'
import ErrorPage from '../../Pages/Error'

describe('Error page', function () {
  it('renders a text for given status', function () {
    render(<ErrorPage status={500} />)
    const message = screen.getByText('Whoops, something went wrong on our servers.')
    expect(message).toBeInTheDocument()
  })
})
