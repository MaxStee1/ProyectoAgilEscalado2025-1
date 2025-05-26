import './MyReservationsPage.css'

import { useQuery } from '@tanstack/react-query'
import { LuCalendar, LuTicket } from 'react-icons/lu'
import { TbMovie } from 'react-icons/tb'
import Card from '../../components/Card/Card'
import { getUserReservations } from '../../services/reservations/get_user_reservations'
import useGetNextReservation from './hooks/useGetNextReservation'
import ReservationCard from './ReservationCard/ReservationCard'

const MyReservations = () => {
	const { data, refetch } = useQuery({
		queryKey: ['reservations'],
		queryFn: getUserReservations,
	})

	const getNextReservation = useGetNextReservation(data)

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
						<p className='summary-data'>{data?.length}</p>
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
				{data?.map(reservation => (
					<ReservationCard
						key={reservation.id}
						reservation={reservation}
						refetchUserReservations={refetch}
					/>
				))}
			</div>
		</div>
	)
}

export default MyReservations
