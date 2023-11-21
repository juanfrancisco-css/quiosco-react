import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx' ya no quiero usar este <App />
import { RouterProvider } from 'react-router-dom'
import { QuioscoProvider } from './context/QuioscoProvider' //importarlo  y rodearlo
import router from './router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
              <QuioscoProvider>
                       <RouterProvider router={router} />
              </QuioscoProvider>
</React.StrictMode>
 
)
