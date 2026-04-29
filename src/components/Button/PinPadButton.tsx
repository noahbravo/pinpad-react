// Styles
import styles from './PinPadButton.module.sass'

type PinPadButtonProps = {
  value: string
  action: () => void
  disabled?: boolean
}

const PinPadButton = ({ value, action, disabled = false }: PinPadButtonProps) => {
  return (
    <button
      className={`${styles.pinPadButton} ${disabled ? styles.disabled : ''}`}
      type="button"
      disabled={disabled}
      onClick={action}
    >
      <span className={styles.pinPadButton__number}>{value}</span>
    </button>
  )
}

export default PinPadButton
