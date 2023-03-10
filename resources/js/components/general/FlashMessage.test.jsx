import React from 'react'
import { render, screen } from '@testing-library/react'
import { FlashMessage } from './FlashMessage'

describe('FlashMessage component', function () {
  it('renders a message', function () {
    render(<FlashMessage message="Hello" type="error" />)
    const message = screen.getByText('Hello')
    expect(message).toBeInTheDocument()
  })
})
