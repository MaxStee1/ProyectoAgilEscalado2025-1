import type { Horario } from '../../pages/Home'

export type Reservation = {
	id: number
	userId: number
	horarioId: number
	horario: Horario
}
