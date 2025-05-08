import express from 'express'
import { register, login } from '../controllers/authController'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/horarios', (req, res) => {
  res.json({
    horariosDisponibles: [
      { dia: 'Lunes', hora: '10:00 - 12:00' },
      { dia: 'Martes', hora: '14:00 - 16:00' }
    ]
  })
})

export default router
