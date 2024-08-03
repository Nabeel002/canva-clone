import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Toolbar from './Toolbar'
import DrawingArea from './DrawingArea'
import CanvasEditor from './CanvasEditor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<CanvasEditor/>
    </>
  )
}

export default App
