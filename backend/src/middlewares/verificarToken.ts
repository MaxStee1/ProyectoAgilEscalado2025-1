import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const SECRET = 'clave_secreta'

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ error: 'Token no proporcionado' })

  const token = authHeader.split(' ')[1]
  try {
    const payload: any = jwt.verify(token, SECRET)
    ;(req as any).userId = payload.userId
    next()
  } catch {
    return res.status(403).json({ error: 'Token inválido' })
  }
}
