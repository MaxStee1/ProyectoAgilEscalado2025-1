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
  const [loading, setLoading] = useState(true)
  const [reservandoId, setReservandoId] = useState<number | null>(null)

  const obtenerHorariosDisponibles = async () => {
    setLoading(true)
    try {
      const res = await axios.get<{ horariosDisponibles: Horario[] }>('http://localhost:3000/api/horarios')
      setHorarios(res.data.horariosDisponibles)
    } catch {
      alert('Error al obtener horarios')
    } finally {
      setLoading(false)
    }
  }

  const reservar = async (horarioId: number) => {
    setReservandoId(horarioId)
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
    } finally {
      setReservandoId(null)
    }
  }

  useEffect(() => {
    obtenerHorariosDisponibles()
  }, [])

  // Agrupar horarios por día
  const horariosPorDia = horarios.reduce((acc, horario) => {
    if (!acc[horario.dia]) {
      acc[horario.dia] = []
    }
    acc[horario.dia].push(horario)
    return acc
  }, {} as Record<string, Horario[]>)

  return (
    <div style={{ 
      padding: 40, 
      maxWidth: 800, 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30
      }}>
        <h2 style={{ margin: 0, color: '#2b4a6f' }}>Bienvenido</h2>
        <button
          className='logout'
          onClick={onLogout} 
          style={{ 
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.2s ease'
          }}
        >
          Cerrar sesión
        </button>
      </header>

      <section style={{
        backgroundColor: '#f8f9fa',
        padding: 25,
        borderRadius: 8,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ 
          marginTop: 0,
          color: '#2b4a6f',
          borderBottom: '1px solid #ddd',
          paddingBottom: 10
        }}>
          Selecciona un horario para reservar
        </h3>
        
        {loading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: 40,
            color: '#666'
          }}>
            Cargando horarios disponibles...
          </div>
        ) : Object.keys(horariosPorDia).length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: 20,
            color: '#666'
          }}>
            No hay horarios disponibles en este momento.
          </div>
        ) : (
          Object.entries(horariosPorDia).map(([dia, horariosDia]) => (
            <div key={dia} style={{ marginBottom: 25 }}>
              <h4 style={{ 
                margin: '0 0 10px 0',
                color: '#2b4a6f',
                fontSize: '18px'
              }}>
                {dia}
              </h4>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '12px'
              }}>
                {horariosDia.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => reservar(h.id)}
                    disabled={reservandoId === h.id}
                    aria-label={`Reservar horario ${h.dia} a las ${h.hora}`}
                    className={`horario-btn${reservandoId === h.id ? ' reservando' : ''}`}
                    style={{
                      padding: '12px 15px',
                      backgroundColor: reservandoId === h.id ? '#4a6fa5' : '#2b4a6f',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '15px',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ fontWeight: 'bold' }}>{h.dia}</div>
                    <div>
                      {reservandoId === h.id ? 'Reservando...' : h.hora}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default Home

const style = document.createElement('style');
style.innerHTML = `
  .logout:hover{
    background-color: #1d3557;
  }
  .horario-btn:not(.reservando):hover {
    background-color: #1d3557;
    transform: translateY(-2px);
  }
  .horario-btn.reservando {
    background-color: #4a6fa5;
    cursor: not-allowed;
  }
`;
document.head.appendChild(style);