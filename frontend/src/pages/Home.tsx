import { useEffect, useState } from 'react'
import axios from 'axios'

type Horario = {
  id: number
  dia: string
  hora: string
  reservado: boolean
}

type Props = {
  token: string
  onLogout: () => void
}

function Home({ token, onLogout }: Props) {
  const [horarios, setHorarios] = useState<Horario[]>([])

  const obtenerHorariosDisponibles = async () => {
    try {
      const res = await axios.get<{ horariosDisponibles: Horario[] }>('http://localhost:3000/api/horarios')
      setHorarios(res.data.horariosDisponibles)
    } catch {
      alert('Error al obtener horarios')
    }
  }

  const reservar = async (horarioId: number) => {
    try {
      await axios.post('http://localhost:3000/api/reservas', { horarioId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      alert('Reserva exitosa')
      obtenerHorariosDisponibles() // actualizar lista
    } catch {
      alert('Error al reservar horario')
    }
  }

  useEffect(() => {
    obtenerHorariosDisponibles()
  }, [])

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>Bienvenido</h2>
      <button onClick={onLogout} style={{ marginBottom: 20 }}>Cerrar sesión</button>

      <h3>Selecciona un horario para reservar</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
        {horarios.map((h) => (
          <button
            key={h.id}
            onClick={() => reservar(h.id)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2b4a6f',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            {h.dia} - {h.hora}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Home
