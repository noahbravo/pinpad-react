import React from 'react'

// Styles
import styles from './App.module.sass'

// Components
import HoneyCombIcon from './components/Icons/Honeycomb'
import PinpadButton from './components/Button/PinpadButton.js'

const App = () => {
  const pinNumbers = [...Array(10).keys()].reverse() /* Generate pin pad numbers */
  const placeholder = 'Enter pin'

  return (
    <div className={styles.pinpad__wrapper}>
      <HoneyCombIcon />
      <div className={styles.pinpad}>
        <div className={styles.pinpad__screen}>
          <span className={styles.pinpad__screen__text}>{placeholder}</span>
        </div>
        <div className={styles.pinpad__btnGroup}>
          {pinNumbers.map(pinNumber => (
            <PinpadButton
              key={pinNumber}
              data={pinNumber}
              action={() => console.log(pinNumber)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
