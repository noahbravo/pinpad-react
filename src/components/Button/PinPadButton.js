import React from 'react'
import PropTypes from 'prop-types'

// Styles
import styles from './PinpadButton.module.sass'

const PinpadButton = ({ value, action, disabled }) => {
  return (
    <button
      className={`${styles.pinpadButton} ${disabled ? styles.disabled : ''}`}
      type="button"
      disabled={disabled}
      onClick={action}
    >
      <span className={styles.pinpadButton__number}>{value}</span>
    </button>
  )
}

PinpadButton.defaultProps = {
  disabled: false
}

PinpadButton.propTypes = {
  value: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default PinpadButton
