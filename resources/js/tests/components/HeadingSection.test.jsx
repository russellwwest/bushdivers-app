import React from 'react'
import { render, screen } from '@testing-library/react'
import { HeadingSection } from '../../components/layout/HeadingSection'

describe('HeadingSection component', function () {
  it('renders a heading', function () {
    render(<HeadingSection heading="Heading One" />)
    const heading = screen.getByText('Heading One')
    expect(heading).toBeInTheDocument()
  })
})
