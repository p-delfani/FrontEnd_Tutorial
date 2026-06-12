import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  )
}


export default App
