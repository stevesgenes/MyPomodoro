import React, { useEffect, useState } from 'react'

import Footer from './Footer'
import Header from './Header'

import CircularProgress from '../components/CircularProgress'

function App() {
  const [time, setTime] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0))
      }, 1000 * 0.01)
    }

    return () => clearInterval(timer)
  }, [isRunning])

  return (
    <div className="App">
      <Header />

      <div align="center">
        <CircularProgress
          size={200}
          progress={(time / (25 * 60)) * 100}
          text={`${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`}

          circleColor="var(--muted)"
          progressColor="var(--coral)"
          textColor="var(--ink)"
          strokeWidth={10}
        />
      </div>

      <div align="center">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pause' : 'Start'}
        </button> 
      </div>

      <Footer />
    </div>
  )
}

export default App
