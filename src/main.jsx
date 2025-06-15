import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/authContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PostProvider } from './context/PostContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
        <PostProvider>
          <App />
        </PostProvider>
      </AuthProvider>
  </StrictMode>,
)
