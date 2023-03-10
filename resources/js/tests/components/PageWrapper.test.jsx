import React from 'react'
import { render, screen } from '@testing-library/react'
import { PageWrapper } from '../../components/layout/PageWrapper'

describe('PageWrapper component', function () {
  it('renders a child', function () {
    render(<PageWrapper isFullSize={false}><div>Hello</div></PageWrapper>)
    const child = screen.getByText('Hello')
    expect(child).toBeInTheDocument()
  })
})
