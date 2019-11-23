import React, {Component} from 'react'

const Card = ({item, ...props}) => {
	return (
		<div className='card' style={{width: 'auto'}}>
			<div className='card-body'>
				<p className='card-subtitle'>{item.subtitle}</p>
			</div>
		</div>
	)
}

export default Card
