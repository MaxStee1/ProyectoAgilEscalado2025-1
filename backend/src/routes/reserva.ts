import express from 'express'
import { crearReserva, obtenerMisReservas } from '../controllers/reservaController'
import { verificarToken } from '../middlewares/verificarToken'

const router = express.Router()

router.post('/reservas', verificarToken, crearReserva)
router.get('/mis-reservas', verificarToken, obtenerMisReservas)

export default router
