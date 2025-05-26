import './Card.css'

import type { ReactNode } from 'react'

type CardProps = {
	children: ReactNode
	className?: string
}

const Card = ({ children, className }: CardProps) => {
	return <div className={`card ${className}`}>{children}</div>
}

export default Card
