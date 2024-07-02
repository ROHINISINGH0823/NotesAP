import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  //This below class is adde to rener the dark and the light theme.
  <BrowserRouter>
  <AuthProvider>
  <div className="dark:bg-slate-900 dark:text-white">
    <App />
    </div>
    </AuthProvider>
    </BrowserRouter>

) 
