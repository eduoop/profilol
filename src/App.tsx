import { useState } from 'react'
import './App.css'
import {SearchAccont} from './pages/SearchAccont'
import { ToastContainer } from "react-toastify";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, Outlet } from 'react-router-dom'


function App() {

  return (
    <div className="App">
      <Outlet/>
      <ToastContainer/>
    </div>
  )
}

export default App
