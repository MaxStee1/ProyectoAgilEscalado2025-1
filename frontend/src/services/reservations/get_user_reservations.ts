import axios from 'axios'
import type { Reservation } from '../../domain/Reservation/Reservation'

export const getUserReservations = async (): Promise<Reservation[]> => {
	const headers = {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	}
	const { data } = await axios.get('http://localhost:3000/api/mis-reservas', {
		headers,
	})

	return data as Reservation[]
}
