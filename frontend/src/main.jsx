import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import './index.css'
import store from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
        <Toaster />
    </Provider>
  </React.StrictMode>,
)