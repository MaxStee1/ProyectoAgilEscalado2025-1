import { useState } from 'react'
import axios from 'axios'
import './LoginForm.css'

type Props = {
  onLoginSuccess: (token: string) => void
}

function LoginForm({ onLoginSuccess }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    try {
      const res = await axios.post<{ token: string }>('http://localhost:3000/api/login', {
        email,
        password,
      })
      onLoginSuccess(res.data.token)
    } catch {
      alert('Credenciales inválidas')
    }
  }

  const registrar = async () => {
    try {
      await axios.post('http://localhost:3000/api/register', { email, password })
      alert('Usuario registrado')
    } catch {
      alert('Error al registrar usuario')
    }
  }

  return (
    <div className="container">
      <div className="login-box">
        <div className="avatar" />
        <h2>Iniciar sesión</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="usuario@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button onClick={login}>LOGIN</button>
          <button onClick={registrar}>REGISTRARSE</button>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
