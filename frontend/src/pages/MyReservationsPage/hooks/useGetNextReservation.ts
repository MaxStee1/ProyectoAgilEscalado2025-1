import type { Reservation } from '../../../domain/Reservation/Reservation'

const useGetNextReservation = (reservations: Reservation[] | undefined) => {
	const weekdayMap: Record<string, number> = {
		Domingo: 0,
		Lunes: 1,
		Martes: 2,
		Miércoles: 3,
		Jueves: 4,
		Viernes: 5,
		Sábado: 6,
	}

	function getNextOccurrence(day: string, time: string): Date | null {
		const targetWeekday = weekdayMap[day]
		if (targetWeekday === undefined) return null

		const now = new Date()
		const [hour, minute] = time.split(':').map(Number)

		const date = new Date(now)
		const currentWeekday = now.getDay()

		const dayOffset = (targetWeekday + 7 - currentWeekday) % 7
		date.setDate(now.getDate() + dayOffset)
		date.setHours(hour, minute, 0, 0)

		if (dayOffset === 0 && date <= now) {
			date.setDate(date.getDate() + 7)
		}

		return date
	}

	const getNextFunctionDate = (): string => {
		if (!reservations || reservations.length === 0) {
			return 'Ninguna'
		}
		const now = new Date()

		const upcoming = reservations
			.map(r => {
				const nextDate = getNextOccurrence(r.horario.dia, r.horario.hora)
				return nextDate
					? { date: nextDate, day: r.horario.dia, time: r.horario.hora }
					: null
			})
			.filter(
				(r): r is { date: Date; day: string; time: string } =>
					r !== null && r.date > now
			)
			.sort((a, b) => a.date.getTime() - b.date.getTime())

		if (upcoming.length === 0) return 'Ninguna'

		const next = upcoming[0]
		const isToday = next.date.toDateString() === now.toDateString()

		return isToday ? `Hoy, ${next.time}` : `${next.day}, ${next.time}`
	}

	return getNextFunctionDate
}

export default useGetNextReservation
