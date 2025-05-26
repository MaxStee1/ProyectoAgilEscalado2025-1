import express from 'express'
import {
	crearReserva,
	deleteReservation,
	obtenerMisReservas,
} from '../controllers/reservaController'
import { verificarToken } from '../middlewares/verificarToken'

const router = express.Router()

router.post('/reservas', verificarToken, crearReserva)
router.get('/reservas', verificarToken, obtenerMisReservas)
router.delete('/reservas/:id', verificarToken, deleteReservation)

export default router
