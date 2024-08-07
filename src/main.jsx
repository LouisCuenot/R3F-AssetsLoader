import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AssetsProvider } from './AssetsProvider/AssetsProvider.jsx'
import { HooksProvider } from './HooksProvider/HooksProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <AssetsProvider>
      <HooksProvider>
        <App />
      </HooksProvider>
    </AssetsProvider>
)
