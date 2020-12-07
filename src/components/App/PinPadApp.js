import React, { useState, useReducer } from 'react'

// Styles
import styles from './PinPadApp.module.sass'

// Components
import HoneyCombIcon from '../Icons/HoneycombIcon'
import PinPadButton from '../Button/PinPadButton'

const PinPadApp = () => {
  const correctPin = '4747' /* Hardcoded pin. To be fetched from an API */
  const pinNumbers = [...Array(10).keys()].reverse() /* Generate pin pad numbers */
  const placeholder = 'Enter pin' /* Pin pad display placeholder text */
  const maxAttempts = 2 /* Max number of incorrect attempts */
  const resetTime = 1200 /* Reset time when pin pad status is ok or error */
  const lockedTime = 30000 /* Reset time when pin pad status is locked */

  const [pin, setPin] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const tooManyAttemps = attempts === maxAttempts

  const statusReducer = (state, { type }) => {
    switch (type) {
      case 'OK':
        return 'ok'
      
      case 'ERROR':
        if (tooManyAttemps) return 'locked'
        return 'error'
  
      case 'RESET':
        return placeholder

      default:
        throw new Error(`Unsupported type: ${type}`)
    }
  }

  const [status, setStatus] = useReducer(statusReducer, placeholder)

  const { length: correctPinLength } = correctPin
  const { length: pinLength} = pin

  const handleReset = async (time, attempts) => {
    await setTimeout(() => {
      setPin('')
      setStatus({ type: 'RESET' })
      setAttempts(attempts)
      setDisabled(false)
    }, time)
  }

  const handlePin = (number) => {
    const newPin = pin + number
    if (pinLength < correctPinLength) {
      setPin(newPin)
    }

    // Update status once all pin numbers have been entered
    if (newPin.length === correctPinLength) {
      const okStatus = newPin === correctPin
      const statusAction = okStatus ? 'OK' : 'ERROR'
      const timeOut = tooManyAttemps ? lockedTime : resetTime
      const attemptsToUpdate = (!okStatus && !tooManyAttemps) ? attempts + 1 : 0

      setStatus({ type: statusAction })
      setDisabled(true)
      handleReset(timeOut, attemptsToUpdate)
    }
  }

  // Set screen text as pin if entered and pin is less than correctPin.
  // Otherwise display status.
  const getDisplayText = () => {
    if (pinLength > 0 && pinLength < correctPinLength) {
      return pin.split('').map(
        (number, index) => (index + 1) === pinLength ? number : '*')
        .join('')
    } else {
      return status
    }
  }

  return (
    <div className={styles.pinPadApp__wrapper}>
      <HoneyCombIcon className={status} />
      <div className={styles.pinPadApp}>
        <div className={styles.pinPadApp__display}>
          <span data-testid="displayText" className={styles.pinPadApp__display__text}>
            {getDisplayText()}
          </span>
        </div>
        <div className={styles.pinPadApp__btnGroup}>
          {pinNumbers.map(pinNumber => (
            <PinPadButton
              key={pinNumber}
              value={pinNumber.toString()}
              disabled={disabled}
              action={() => handlePin(pinNumber)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PinPadApp
