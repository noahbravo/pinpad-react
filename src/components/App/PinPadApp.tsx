// Styles
import styles from './PinPadApp.module.sass'

// Components
import HoneyCombIcon from '../Icons/HoneycombIcon'
import PinPadButton from '../Button/PinPadButton'
import { PIN_NUMBERS, usePinPad, type PinPadConfig } from './usePinPad'

const PinPadApp = (config: PinPadConfig) => {
  const { displayText, isWaitingForReset, pressDigit, status } = usePinPad(config)

  return (
    <div className={styles.pinPadApp__wrapper}>
      <HoneyCombIcon className={status} />
      <div className={styles.pinPadApp}>
        <div className={styles.pinPadApp__display}>
          <span
            data-testid="displayText"
            className={styles.pinPadApp__display__text}
          >
            {displayText}
          </span>
        </div>
        <div className={styles.pinPadApp__btnGroup}>
          {PIN_NUMBERS.map((pinNumber) => (
            <PinPadButton
              key={pinNumber}
              value={pinNumber.toString()}
              disabled={isWaitingForReset}
              action={() => pressDigit(pinNumber)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PinPadApp
