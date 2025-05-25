import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './pages/Home'

function App() {
  const [token, setToken] = useState<string | null>(null)

  // Recuperar token de localStorage al cargar la app
  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) setToken(savedToken)
  }, [])

  // Guardar token en localStorage al iniciar sesión
  const handleLogin = (newToken: string) => {
    setToken(newToken)
    localStorage.setItem('token', newToken)
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <Routes>
      <Route path='/' 
        element={ token ? 
          (
            <Navigate to='/home' replace />
          ) : (
            <Navigate to='/login' replace />
          )
        }
      />

      <Route path='/login' 
        element={ token ? 
          ( 
            <Navigate to='/home' replace /> 
          ) : ( 
            <LoginForm onLoginSuccess={handleLogin} /> 
          ) 
        } 
      />

      <Route path='/home' 
        element={ token ? 
          (
            <Home token={token} onLogout={handleLogout} />
          ) : (
            <Navigate to='/login' replace /> 
          ) 
        }
      />
    </Routes>
  )
}

export default App