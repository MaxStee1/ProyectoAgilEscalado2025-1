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

		const reservation = await prisma.reserva.create({
			data: {
				userId,
				horarioId,
			},
		})

		await prisma.horario.update({
			where: { id: horarioId },
			data: { reservado: true },
		})

		res.json({ message: 'Reserva creada con éxito', reservation })
	} catch (err) {
		res.status(500).json({ error: 'Error al crear la reservation' })
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

export const deleteReservation = async (req: Request, res: Response) => {
	const { id } = req.params
	const userId = (req as any).userId
	let reservation = null

	try {
		reservation = await prisma.reserva.findUnique({
			where: { id: Number(id) },
		})
	} catch (err) {
		res.status(500).json({ error: 'Error al eliminar la reserva' })
	}

	if (!reservation || reservation.userId !== userId) {
		res.status(404).json({ error: 'Reserva no encontrada' })
		return
	}

	await prisma.reserva.delete({
		where: { id: Number(id) },
	})

	await prisma.horario.update({
		where: { id: reservation.horarioId },
		data: { reservado: false },
	})

	res.json({ message: 'Reserva eliminada con éxito' })
}
