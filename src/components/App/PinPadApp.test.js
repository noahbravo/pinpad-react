import React from 'react'
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react"
import PinPadApp from './PinPadApp'

const placeholder = 'Enter pin'
const testPin = ['4', '5']
const okStatus = 'ok'
const errorStatus = 'error'
const lockedStatus = 'locked'
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
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  const resetPinPad = () => {
    act(() => {
      jest.advanceTimersByTime(1200)
    })
  }

  test('Should display ok when pin is correct and reset pin pad', () => {
    render(<PinPadApp />)
    fireButtons(correctPin, screen)
    const displayText = getDisplayText(screen)
    expect(displayText).toHaveTextContent(okStatus)
    resetPinPad()
    expect(displayText).toHaveTextContent(placeholder)
  })

  test('Should display error when pin is incorrect and reset pin pad', () => {
    render(<PinPadApp />)
    fireButtons(incorrectPin, screen)
    const displayText = getDisplayText(screen)
    expect(displayText).toHaveTextContent(errorStatus)
    resetPinPad()
    expect(displayText).toHaveTextContent(placeholder)
  })

  test('Should lock on max incorrect attempts', () => {
    render(<PinPadApp />)
    fireButtons(incorrectPin, screen)
    resetPinPad()
    fireButtons(incorrectPin, screen)
    expect(getDisplayText(screen)).toHaveTextContent(errorStatus)
    resetPinPad()
    fireButtons(incorrectPin, screen)
    const displayText = getDisplayText(screen)
    expect(displayText).toHaveTextContent(lockedStatus)
  })

})
