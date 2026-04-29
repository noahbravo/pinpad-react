import { useEffect, useReducer, useRef } from 'react'
import type { MutableRefObject } from 'react'

export const DEFAULT_CORRECT_PIN = '4747'
export const PIN_NUMBERS = [...Array(10).keys()].reverse()
export const PLACEHOLDER = 'Enter pin'
export const MAX_ATTEMPTS = 3
export const RESET_TIME = 1200
export const LOCKED_TIME = 30000

export const PIN_PAD_STATUS = {
  idle: 'idle',
  ok: 'ok',
  error: 'error',
  locked: 'locked'
} as const

export type PinPadStatus = typeof PIN_PAD_STATUS[keyof typeof PIN_PAD_STATUS]

export type PinPadConfig = {
  correctPin?: string
  maxAttempts?: number
  resetTime?: number
  lockedTime?: number
}

type State = {
  pin: string
  attempts: number
  status: PinPadStatus
}

type AddDigitAction = {
  type: 'ADD_DIGIT'
  digit: number
  correctPin: string
  maxAttempts: number
}

type ResetAction = {
  type: 'RESET'
  attempts: number
}

type Action = AddDigitAction | ResetAction

const getInitialState = (): State => ({
  pin: '',
  attempts: 0,
  status: PIN_PAD_STATUS.idle
})

const assertNever = (action: never): never => {
  throw new Error(`Unsupported type: ${JSON.stringify(action)}`)
}

const pinPadReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_DIGIT': {
      if (state.status !== PIN_PAD_STATUS.idle) return state

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
        status: isCorrectPin
          ? PIN_PAD_STATUS.ok
          : isLocked
            ? PIN_PAD_STATUS.locked
            : PIN_PAD_STATUS.error
      }
    }

    case 'RESET':
      return {
        ...getInitialState(),
        attempts: action.attempts
      }

    default:
      return assertNever(action)
  }
}

const clearResetTimer = (timer: MutableRefObject<ReturnType<typeof setTimeout> | null>) => {
  if (timer.current) {
    clearTimeout(timer.current)
    timer.current = null
  }
}

const getMaskedPin = (pin: string) => (
  pin.split('').map((number, index) => (index + 1 === pin.length ? number : '*')).join('')
)

export const usePinPad = ({
  correctPin = DEFAULT_CORRECT_PIN,
  maxAttempts = MAX_ATTEMPTS,
  resetTime = RESET_TIME,
  lockedTime = LOCKED_TIME
}: PinPadConfig = {}) => {
  const [state, dispatch] = useReducer(pinPadReducer, getInitialState())
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { pin, attempts, status } = state
  const isWaitingForReset = status !== PIN_PAD_STATUS.idle

  useEffect(() => {
    return () => {
      clearResetTimer(resetTimer)
    }
  }, [])

  useEffect(() => {
    if (status === PIN_PAD_STATUS.idle) return

    const resetDelay = status === PIN_PAD_STATUS.locked ? lockedTime : resetTime
    const attemptsAfterReset = status === PIN_PAD_STATUS.error ? attempts : 0

    clearResetTimer(resetTimer)
    resetTimer.current = setTimeout(() => {
      dispatch({ type: 'RESET', attempts: attemptsAfterReset })
    }, resetDelay)

    return () => {
      clearResetTimer(resetTimer)
    }
  }, [attempts, lockedTime, resetTime, status])

  const pressDigit = (digit: number) => {
    dispatch({
      type: 'ADD_DIGIT',
      digit,
      correctPin,
      maxAttempts
    })
  }

  const displayText = pin.length > 0 && pin.length < correctPin.length
    ? getMaskedPin(pin)
    : status === PIN_PAD_STATUS.idle
      ? PLACEHOLDER
      : status

  return {
    displayText,
    isWaitingForReset,
    pressDigit,
    status
  }
}
