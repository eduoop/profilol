import React from 'react'
import ReactDOM from 'react-dom/client'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import App from './App'
import { SearchAccont } from './pages/SearchAccont'
import { UserProfile } from './pages/UserProfile'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path='/' element={<SearchAccont/>}/>
        <Route path='/profile/:username' element={<UserProfile/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
)
