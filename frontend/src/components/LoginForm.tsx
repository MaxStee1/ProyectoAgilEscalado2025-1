import { useState } from 'react'
import axios from 'axios'
import './LoginForm.css'

type Props = {
  onLoginSuccess: (token: string) => void
}

type FormMode = 'login' | 'register'

function LoginForm({ onLoginSuccess }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<FormMode>('login')
  const [error, setError] = useState('')

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post<{ token: string }>('http://localhost:3000/api/login', {
        email,
        password,
      })
      onLoginSuccess(res.data.token)
    } catch (error) {
      console.error('credenciales incorrectas', error)
      setError('Credenciales incorrectas')
      setTimeout(() => setError(''), 2000)
    }
  }

  const registrar = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3000/api/register', { email, password })
      alert('Usuario registrado')
      setMode('login')
    } catch {
      setError('Error al registrar usuario')
      setTimeout(() => setError(''), 2000)
    }
  }

  return (
    <div className="container">
      <div className="login-box">
        <div className="avatar" />

        <div className='mode-selector'>
          <button
            className={`mode-button ${mode === 'login' ? 'active' : ''}`}
            onClick={() => setMode('login')}
          >
            Iniciar sesion
          </button>
          <button
            className={`mode-button ${mode === 'register' ? 'active' : ''}`}
            onClick={() => setMode('register')}
          >
            Registrarse
          </button>
        </div>
        {mode === 'login' ? (
          <>
            <h2>Iniciar sesión</h2>
            <form onSubmit={login}>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="usuario@correo.com"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  placeholder="********"
                  minLength={6}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="button-group">
                <button type='submit'>LOGIN</button>
              </div>
            </form>
            {error && <div className="error-message visible">{error}</div>}
            {!error && <div className="error-message"></div>}
          </>
        ) : (
          <>
          <h2>Registrarse</h2>
          <form onSubmit={registrar}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="usuario@correo.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Contraseña</label>
              <input
                type="password"
                placeholder="********"
                minLength={6}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="button-group">
              <button type='submit'>REGISTER</button>
            </div>
          </form>
          {error && <div className="error-message visible">{error}</div>}
          {!error && <div className="error-message"></div>}
        </>
        )}
      </div>
    </div>
  )
}

export default LoginForm
