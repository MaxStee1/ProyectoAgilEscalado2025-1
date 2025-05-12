import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './pages/Home'

function App() {
  const [token, setToken] = useState<string | null>(null)

  const handleLogout = () => {
    setToken(null)
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
            <LoginForm onLoginSuccess={setToken} /> 
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