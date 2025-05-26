import './ReservationCard.css'

import type { Reservation } from '../../../domain/Reservation/Reservation'
import Card from '../../../components/Card/Card'
import { LuCalendar } from 'react-icons/lu'
import { FaRegClock } from 'react-icons/fa6'
import { cancelReservation } from '../../../services/reservations/cancel_reservation'

type ReservationCardProps = {
	reservation: Reservation
	refetchUserReservations?: () => void
}

const ReservationCard = ({
	reservation,
	refetchUserReservations,
}: ReservationCardProps) => {
	return (
		<Card className='reservation-card'>
			<div className='reservation-data reservation-id'>
				<p>ID: {reservation.id}</p>
			</div>

			<p className='movie-title'>Guardianes de la Galaxia Vol. 3</p>

			<div className='reservation-details'>
				<div className='reservation-data time-data'>
					<LuCalendar />
					<p>{reservation.horario.dia}</p>
				</div>

				<div className='reservation-data time-data'>
					<FaRegClock />
					<p>{reservation.horario.hora}</p>
				</div>
			</div>
			<button
				className='cancel-button'
				onClick={() => {
					cancelReservation(reservation.id).then(() => {
						if (refetchUserReservations) refetchUserReservations()
					})
				}}
			>
				Cancelar
			</button>
		</Card>
	)
}

export default ReservationCard
