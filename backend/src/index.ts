import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth'
import reservaRoutes from './routes/reserva'
import horariosRoutes from './routes/horarios'

const app = express()

app.use(cors())
app.use(express.json()) 

app.use('/api', reservaRoutes)
app.use('/api', horariosRoutes)
app.use('/api', authRoutes)

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000')
})
