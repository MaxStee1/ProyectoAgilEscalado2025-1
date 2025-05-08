import { Request, Response } from 'express'
import { prisma } from '../prismaClient'

export const obtenerHorariosDisponibles = async (req: Request, res: Response) => {
  try {
    const horarios = await prisma.horario.findMany({
      where: {
        reservado: false
      }
    })

    res.json({ horariosDisponibles: horarios })
  } catch {
    res.status(500).json({ error: 'Error al obtener los horarios' })
  }
}
