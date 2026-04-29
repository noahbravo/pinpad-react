import { render, screen, fireEvent, cleanup, act } from "@testing-library/react"
import type { RenderResult } from '@testing-library/react'
import PinPadApp from './PinPadApp'

const placeholder = 'Enter pin'
const testPin = ['4', '5']
const okStatus = 'ok'
const errorStatus = 'error'
const lockedStatus = 'locked'
const incorrectPin = ['2', '9', '6', '5']
const correctPin = ['4', '7', '4', '7']
const shortCorrectPin = ['1', '2']

type QueryTarget = Pick<RenderResult, 'getByRole' | 'getByTestId'>

const fireButtons = (pin: string[], component: QueryTarget) => {
  pin.forEach(number => {
    const button = component.getByRole('button', { name: number })
    fireEvent.click(button)
  })
}

const getDisplayText = (component: QueryTarget) => component.getByTestId('displayText')

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
    vi.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  const resetPinPad = () => {
    act(() => {
      vi.advanceTimersByTime(1200)
    })
  }

  const advanceTimers = (time: number) => {
    act(() => {
      vi.advanceTimersByTime(time)
    })
  }

  test('Should display ok when pin is correct and reset pin pad', () => {
    render(<PinPadApp />)
    fireButtons(correctPin, screen)
    const displayText = getDisplayText(screen)
    expect(displayText).toHaveTextContent(okStatus)
    expect(screen.getAllByRole('button')).toEqual(
      expect.arrayContaining([expect.objectContaining({ disabled: true })])
    )
    resetPinPad()
    expect(displayText).toHaveTextContent(placeholder)
    expect(screen.getAllByRole('button')).toEqual(
      expect.arrayContaining([expect.objectContaining({ disabled: false })])
    )
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

  test('Should use custom pin and reset time', () => {
    render(<PinPadApp correctPin="12" resetTime={500} />)
    fireButtons(shortCorrectPin, screen)
    const displayText = getDisplayText(screen)
    expect(displayText).toHaveTextContent(okStatus)
    advanceTimers(499)
    expect(displayText).toHaveTextContent(okStatus)
    advanceTimers(1)
    expect(displayText).toHaveTextContent(placeholder)
  })

  test('Should use custom max attempts and locked time', () => {
    render(<PinPadApp correctPin="12" maxAttempts={1} lockedTime={1000} />)
    fireButtons(['9', '9'], screen)
    const displayText = getDisplayText(screen)
    expect(displayText).toHaveTextContent(lockedStatus)
    advanceTimers(999)
    expect(displayText).toHaveTextContent(lockedStatus)
    advanceTimers(1)
    expect(displayText).toHaveTextContent(placeholder)
  })

})
