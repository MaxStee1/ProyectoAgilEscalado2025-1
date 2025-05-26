import './MyReservationsPage.css'

import { useEffect, useState } from 'react'
import type { Reservation } from '../../domain/Reservation/Reservation'
import { getUserReservations } from '../../services/reservations/get_user_reservations'
import ReservationCard from './ReservationCard/ReservationCard'
import { LuCalendar, LuTicket } from 'react-icons/lu'
import Card from '../../components/Card/Card'
import { TbMovie } from 'react-icons/tb'
import useGetNextReservation from './hooks/useGetNextReservation'

const MyReservations = () => {
	const [reservations, setReservations] = useState<Reservation[]>([])
	const getNextReservation = useGetNextReservation(reservations)

	useEffect(() => {
		getUserReservations()
			.then(setReservations)
			.catch(error => {
				console.error('Error al obtener reservas:', error)
				alert('Error al obtener reservas')
			})
	}, [])

	return (
		<div>
			<div className='page-title'>
				<LuTicket className='page-title-icon' />
				<p>Mis Reservas Activas</p>
			</div>
			<div className='reservations-summary'>
				<Card className='summary-card'>
					<TbMovie className='summary-card-icon' />
					<div>
						<p className='summary-header'>Total Reservas</p>
						<p className='summary-data'>{reservations.length}</p>
					</div>
				</Card>

				<Card className='summary-card'>
					<LuCalendar className='summary-card-icon next-function' />
					<div>
						<p className='summary-header'>Próxima Función</p>
						<p className='summary-data'>{getNextReservation()}</p>
					</div>
				</Card>
			</div>
			<div className='reservations-list'>
				{reservations.map(reservation => (
					<ReservationCard key={reservation.id} reservation={reservation} />
				))}
			</div>
		</div>
	)
}

export default MyReservations
