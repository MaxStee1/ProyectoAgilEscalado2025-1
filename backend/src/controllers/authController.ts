import { Request, Response } from 'express'
import { prisma } from '../prismaClient'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET = 'clave_secreta'

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const hashed = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({ data: { email, password: hashed } })
    res.json({ message: 'Usuario registrado', user: { id: user.id, email: user.email } })
  } catch (err) {
    res.status(400).json({ error: 'Email ya registrado' })
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' })

  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1h' })
  res.json({ message: 'Inicio de sesión exitoso', token })
}
