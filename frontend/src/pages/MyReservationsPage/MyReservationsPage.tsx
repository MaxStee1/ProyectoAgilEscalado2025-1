import './MyReservationsPage.css'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
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

	const [filtroDia, setFiltroDia] = useState<string>('Todos')

	const getNextReservation = useGetNextReservation(data)

	const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
	const reservasFiltradas = filtroDia === 'Todos' ? data : data?.filter(r => r.horario.dia === filtroDia)
	const reservasOrdenadas = reservasFiltradas?.slice().sort((a, b) => {
		const diaA = diasSemana.indexOf(a.horario.dia)
		const diaB = diasSemana.indexOf(b.horario.dia)
		if (diaA !== diaB) return diaA - diaB
		const horaA = parseInt(a.horario.hora)
		const horaB = parseInt(b.horario.hora)
		return horaA - horaB
	})

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

			<div className='reservations-filter'>
				<label htmlFor="filtro-dia">Filtrar por día:</label>
				<select
					id="filtro-dia"
					value={filtroDia}
					onChange={e => setFiltroDia(e.target.value)}
					className="filter-select"
				>
					<option value="Todos">Todos</option>
					{diasSemana.map(dia => (
						<option key={dia} value={dia}>{dia}</option>
					))}
				</select>
			</div>

			<div className='reservations-list'>
				{reservasOrdenadas?.map(reservation => (
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
