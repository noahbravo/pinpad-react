import { render, screen, fireEvent, cleanup } from "@testing-library/react"
import PinPadButton from './PinPadButton'

describe('PinPadButton', () => {
  const testProps = {
    value: '1',
    disabled: false,
    action: vi.fn()
  }

  afterEach(() => {
    cleanup()
    testProps.action.mockClear()
  })

  const renderPinPad = (props: typeof testProps) => {
    render(<PinPadButton {...props} />)
  }

  const getButton = () => screen.getByRole('button', {name: testProps.value})

  test('Should render PinPadButton correctly', () => {
    render(<PinPadButton { ...testProps }/>)
    expect(getButton()).toBeInTheDocument()
  })

  test('Action function should be called onClick', () => {
    renderPinPad(testProps)
    const button = getButton()
    fireEvent.click(button)
    expect(testProps.action).toHaveBeenCalledTimes(1)
  })

  test('PinPadButton should be disabled when property is set to true', () => {
    const disabledBtnProps = { ...testProps, disabled: true }
    renderPinPad(disabledBtnProps)
    const button = getButton()
    expect(button).toHaveAttribute('disabled')
  })

})
