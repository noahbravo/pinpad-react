import React from 'react'

// Styles
import styles from './PinpadButton.module.sass'

const PinpadButton = ({ data, action }) => {
  return (
    <button className={styles.pinpadButton} type="button" onClick={action}>
      <span className={styles.pinpadButton__number}>{data}</span>
    </button>
  )
}

export default PinpadButton
