import { useState } from 'react'
import LoginForm from './components/LoginForm'
import Home from './pages/Home'

function App() {
  const [token, setToken] = useState<string | null>(null)

  const handleLogout = () => {
    setToken(null)
  }

  return (
    <>
      {!token ? (
        <LoginForm onLoginSuccess={setToken} />
      ) : (
        <Home token={token} onLogout={handleLogout} />
      )}
    </>
  )
}

export default App
