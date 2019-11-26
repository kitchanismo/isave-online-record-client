import React, {useState, useEffect} from 'react'
import Table from '../../common/table'
import {sortBy, toElipse, cap} from '../../../services/utilsService'

const TableBranch = ({branches, setBranches, ...props}) => {
	const [sortColumn, setSortColumn] = useState({path: 'name', order: 'asc'})

	const _branches = () =>
		branches.map(b => {
			b.address = toElipse(b.address, 20)
			b.manager = b.manager !== null ? toElipse(b.manager, 20) : b.manager
			return b
		})

	const handleSort = sortColumn => {
		setSortColumn(sortColumn)
		setBranches(sortBy(branches, sortColumn))
	}

	const columns = [
		{
			path: 'name',
			label: 'Name',
			content: branch => cap(branch.name)
		},
		{
			path: 'manager',
			label: 'Manager',
			content: branch => cap(branch.manager)
		},

		{
			path: 'address',
			label: 'Address',
			content: branch => cap(branch.address)
		},
		{
			path: 'contact',
			label: 'Contact'
		},
		{
			key: 'actions',
			label: 'Action',
			content: branch => (
				<button
					onClick={() => props.history.replace(`/branches/edit/${branch.id}`)}
					className='btn btn-sm btn-outline-warning ml-1'
				>
					EDIT
				</button>
			)
		}
	]

	return (
		<Table
			columns={columns}
			data={_branches()}
			sortColumn={sortColumn}
			onSort={handleSort}
		/>
	)
}

export default TableBranch
