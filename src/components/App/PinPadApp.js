import React, { useState } from 'react'

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
  const [status, setStatus] = useState(placeholder)
  const [disabled, setDisabled] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const tooManyAttemps = attempts === maxAttempts
  const { length: correctPinLength } = correctPin
  const { length: pinLength} = pin

  const handleReset = async (time) => {
    await setTimeout(() => {
      setPin('')
      setStatus(placeholder)
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
      let currentStatus,
          attemptsToUpdate = 0,
          timeOut = resetTime
  
      if (newPin === correctPin) {
        currentStatus = 'ok'

      } else {

        if (tooManyAttemps) {
          currentStatus = 'locked'
          timeOut = lockedTime
        } else {
          currentStatus = 'error'
          attemptsToUpdate = attempts + 1
        }
      }

      setAttempts(attemptsToUpdate)
      setStatus(currentStatus)
      setDisabled(true)
      handleReset(timeOut)
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
