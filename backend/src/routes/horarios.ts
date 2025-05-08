import express from 'express'
import { obtenerHorariosDisponibles } from '../controllers/horariosController'

const router = express.Router()

router.get('/horarios', obtenerHorariosDisponibles)

export default router
