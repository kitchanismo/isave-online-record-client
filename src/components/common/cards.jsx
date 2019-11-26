import React, {Component} from 'react'
import _ from 'lodash'

const Cards = ({items, columns}) => {
	const renderData = (item, column) => {
		if (column.content) return column.content(item)

		return _.get(item, column.path)
	}
	return (
		<React.Fragment>
			{items.map(item => (
				<div key={item.id} className='card mb-2 px-0' style={{width: 'auto'}}>
					<div className='card-body text-center'>
						{columns.map(column => (
							<React.Fragment>
								{column.key !== 'actions' && (
									<p className='card-title mt-2'>{column.label}:</p>
								)}
								{column.key === 'actions' && <hr></hr>}
								<p className='card-subtitle mt-2 text-secondary'>
									{renderData(item, column)}
								</p>
							</React.Fragment>
						))}
					</div>
				</div>
			))}
		</React.Fragment>
	)
}

export default Cards
