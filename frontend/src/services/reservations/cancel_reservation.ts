import axios from 'axios'

export const cancelReservation = async (
	reservationId: number
): Promise<void> => {
	const headers = {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	}

	await axios.delete(`http://localhost:3000/api/reservas/${reservationId}`, {
		headers,
	})
}
