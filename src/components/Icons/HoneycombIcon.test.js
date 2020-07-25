import React from 'react'
import { render, screen } from "@testing-library/react"
import HoneycombIcon from './HoneycombIcon'

describe('HoneycombIcon', () => {
  const className = 'locked'

  test('Should render HoneycombIcon correctly', () => {
    const component = render(<HoneycombIcon />)
    expect(component).toMatchSnapshot()
    const stopColor = component.getByTestId('stopColor')
    expect(stopColor).not.toHaveClass('locked')
  })

  test('HoneycombIcon className should match that of className prop', () => {
    render(<HoneycombIcon className={className} />)
    const stopColor = screen.getByTestId('stopColor')
    expect(stopColor).toHaveClass(className)
  })

})
