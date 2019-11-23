import React from 'react'
import TableHeader from './tableHeader'
import TableBody from './tableBody'
import {useMedia} from 'react-use'
import Cards from './cards'

const Table = ({columns, sortColumn, onSort, data}) => {
	const isMobile = useMedia('(max-width: 600px)')

	return (
		<React.Fragment>
			{!isMobile && (
				<table className='table table-bordered table-hover '>
					<TableHeader
						columns={columns}
						sortColumn={sortColumn}
						onSort={onSort}
					/>

					<TableBody columns={columns} data={data} />
				</table>
			)}
			{isMobile && <Cards items={data} columns={columns}></Cards>}
		</React.Fragment>
	)
}

export default Table
