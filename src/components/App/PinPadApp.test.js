import React from 'react'
import { render, screen, fireEvent, cleanup } from "@testing-library/react"
import PinPadApp from './PinPadApp'

const placeholder = 'Enter pin'
const testPin = ['4', '5']
const okStatus = 'ok'
const errorStatus = 'error'
const incorrectPin = ['2', '9', '6', '5']
const correctPin = ['4', '7', '4', '7']

const fireButtons = (pin, component) => {
  pin.forEach(number => {
    const button = component.getByRole('button', { name: number })
    fireEvent.click(button)
  })
}

const getDisplayText = (component) => component.getByTestId('displayText')

describe('PinpadApp', () => {
  afterEach(cleanup)

  test('Should render PinPadApp correctly while dislay text should match placeholder', () => {
    const component = render(<PinPadApp />)
    expect(component).toMatchSnapshot()
    const displayText = getDisplayText(component)
    expect(displayText).toHaveTextContent(placeholder)
  })

  test('Render correct text on pin pad update', () => {
    render(<PinPadApp />)
    fireButtons(testPin, screen)
    const displayText = getDisplayText(screen)
    expect(displayText).toHaveTextContent('*5')
  })

})

describe('PinpadApp status', () => {
  afterEach(cleanup)

  test('Should display ok when pin is correct and reset pin pad', async () => {
    render(<PinPadApp />)
    fireButtons(correctPin, screen)
    const displayText = getDisplayText(screen)
    expect(displayText).toHaveTextContent(okStatus)
    expect(await screen.findByText(placeholder)).toBeInTheDocument()
  })

  test('Should display error when pin is incorrect and reset pin pad', async () => {
    render(<PinPadApp />)
    fireButtons(incorrectPin, screen)
    const displayText = getDisplayText(screen)
    expect(displayText).toHaveTextContent(errorStatus)
    expect(await screen.findByText(placeholder)).toBeInTheDocument()
  })

})
