import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {Restaurants} from "./components/restaurant"

function App() {

  return (
    <div className="App">
        <h1>welcome to Restaurant</h1>
        <Restaurants/>
    </div>
  )
}

export default App
