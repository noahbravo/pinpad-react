import React, { useReducer, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

// Styles
import styles from './PinPadApp.module.sass'

// Components
import HoneyCombIcon from '../Icons/HoneycombIcon'
import PinPadButton from '../Button/PinPadButton'

const DEFAULT_CORRECT_PIN = '4747'
const PIN_NUMBERS = [...Array(10).keys()].reverse()
const PLACEHOLDER = 'Enter pin'
const MAX_ATTEMPTS = 3
const RESET_TIME = 1200
const LOCKED_TIME = 30000

const STATUS = {
  idle: 'idle',
  ok: 'ok',
  error: 'error',
  locked: 'locked'
}

const getInitialState = () => ({
  pin: '',
  attempts: 0,
  status: STATUS.idle
})

const pinPadReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DIGIT': {
      if (state.status !== STATUS.idle) return state

      const newPin = `${state.pin}${action.digit}`
      const correctPinLength = action.correctPin.length

      if (newPin.length < correctPinLength) {
        return {
          ...state,
          pin: newPin
        }
      }

      const isCorrectPin = newPin === action.correctPin
      const nextAttempts = isCorrectPin ? 0 : state.attempts + 1
      const isLocked = !isCorrectPin && nextAttempts >= action.maxAttempts

      return {
        pin: newPin,
        attempts: isLocked ? 0 : nextAttempts,
        status: isCorrectPin ? STATUS.ok : isLocked ? STATUS.locked : STATUS.error
      }
    }

    case 'RESET':
      return {
        ...getInitialState(),
        attempts: action.attempts
      }

    default:
      throw new Error(`Unsupported type: ${action.type}`)
  }
}

const PinPadApp = ({
  correctPin = DEFAULT_CORRECT_PIN,
  maxAttempts = MAX_ATTEMPTS,
  resetTime = RESET_TIME,
  lockedTime = LOCKED_TIME
}) => {
  const [state, dispatch] = useReducer(pinPadReducer, getInitialState())
  const resetTimer = useRef()
  const { pin, attempts, status } = state
  const pinLength = pin.length
  const isWaitingForReset = status !== STATUS.idle

  useEffect(() => {
    return () => {
      clearTimeout(resetTimer.current)
    }
  }, [])

  useEffect(() => {
    if (status === STATUS.idle) return

    const resetDelay = status === STATUS.locked ? lockedTime : resetTime
    const attemptsAfterReset = status === STATUS.error ? attempts : 0

    clearTimeout(resetTimer.current)
    resetTimer.current = setTimeout(() => {
      dispatch({ type: 'RESET', attempts: attemptsAfterReset })
    }, resetDelay)

    return () => {
      clearTimeout(resetTimer.current)
    }
  }, [attempts, lockedTime, resetTime, status])

  const handlePin = (digit) => {
    dispatch({
      type: 'ADD_DIGIT',
      digit,
      correctPin,
      maxAttempts
    })
  }

  const getDisplayText = () => {
    if (pinLength > 0 && pinLength < correctPin.length) {
      return pin.split('').map(
        (number, index) => (index + 1) === pinLength ? number : '*')
        .join('')
    }

    if (status === STATUS.idle) return PLACEHOLDER
    return status
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
          {PIN_NUMBERS.map(pinNumber => (
            <PinPadButton
              key={pinNumber}
              value={pinNumber.toString()}
              disabled={isWaitingForReset}
              action={() => handlePin(pinNumber)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

PinPadApp.propTypes = {
  correctPin: PropTypes.string,
  maxAttempts: PropTypes.number,
  resetTime: PropTypes.number,
  lockedTime: PropTypes.number
}

export default PinPadApp
