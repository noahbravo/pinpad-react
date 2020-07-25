import React from 'react'
import { render, screen, fireEvent, cleanup } from "@testing-library/react"
import PinPadButton from './PinPadButton'

describe('PinPadButton', () => {
  const testProps = {
    value: '1',
    disabled: false,
    action: jest.fn()
  }

  afterEach(() => {
    cleanup()
    testProps.action.mockClear()
  })

  const renderPinPad = (props) => {
    render(<PinPadButton {...props} />)
  }

  const getButton = () => screen.getByRole('button', {name: testProps.value})

  test('Should render PinPadButton correctly', () => {
    const component = render(<PinPadButton { ...testProps }/>)
    expect(component).toMatchSnapshot()
  })

  test('Action function should be called onClick', () => {
    renderPinPad(testProps)
    const button = getButton()
    fireEvent.click(button)
    expect(testProps.action).toHaveBeenCalledTimes(1)
  })

  test('PinPadButton should be disabled when property is set to true', () => {
    const disabledBtnProps = {...testProps, disabled: true}
    renderPinPad(disabledBtnProps)
    const button = getButton()
    expect(button).toHaveAttribute('disabled')
  })

})
