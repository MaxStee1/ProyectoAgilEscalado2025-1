import './ReservationCard.css'

import type { Reservation } from '../../../domain/Reservation/Reservation'
import Card from '../../../components/Card/Card'
import { LuCalendar } from 'react-icons/lu'
import { FaRegClock } from 'react-icons/fa6'

type ReservationCardProps = {
	reservation: Reservation
}

const ReservationCard = ({ reservation }: ReservationCardProps) => {
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
		</Card>
	)
}

export default ReservationCard
