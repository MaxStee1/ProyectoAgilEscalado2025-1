import { Request, Response } from 'express'
import { prisma } from '../prismaClient'

export const crearReserva = async (req: Request, res: Response) => {
	const { horarioId } = req.body
	const userId = (req as any).userId

	if (!horarioId) {
		return res.status(400).json({ error: 'Debe proporcionar un horarioId' })
	}

	try {
		const horario = await prisma.horario.findUnique({
			where: { id: horarioId },
		})

		if (!horario || horario.reservado) {
			return res
				.status(400)
				.json({ error: 'Este horario ya está reservado o no existe' })
		}

		const reserva = await prisma.reserva.create({
			data: {
				userId,
				horarioId,
			},
		})

		await prisma.horario.update({
			where: { id: horarioId },
			data: { reservado: true },
		})

		res.json({ message: 'Reserva creada con éxito', reserva })
	} catch (err) {
		res.status(500).json({ error: 'Error al crear la reserva' })
	}
}

export const obtenerMisReservas = async (req: Request, res: Response) => {
	const userId = (req as any).userId

	try {
		const reservas = await prisma.reserva.findMany({
			where: { userId },
			include: {
				horario: true,
			},
		})

		res.json(reservas)
	} catch {
		res.status(500).json({ error: 'Error al obtener tus reservas' })
	}
}
