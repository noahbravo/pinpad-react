import React from 'react'
import PropTypes from 'prop-types'

// Styles
import styles from './PinPadButton.module.sass'

const PinPadButton = ({ value, action, disabled }) => {
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

PinPadButton.defaultProps = {
  disabled: false
}

PinPadButton.propTypes = {
  value: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default PinPadButton
