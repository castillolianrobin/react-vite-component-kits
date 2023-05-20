import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="m-0 p-0 w-full h-full bg-primary-500">
      <Outlet />
    </div>
  )
}

export default App
