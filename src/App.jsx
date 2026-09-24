import Footer from './Footer'
import Header from './Header'
import { useEffect, useState } from 'react'

function App() {
  const [time, setTime] = useState(25 * 60)

  return (
    <div className="App">
      <Header />

      <div align="center">
        <p>{Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</p>
      </div>

      <Footer />
    </div>
  )
}

export default App
