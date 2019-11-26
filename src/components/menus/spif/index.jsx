import React, {useState, useEffect} from 'react'
import Table from '../../common/table'
import {
	toElipse,
	sortBy,
	cap,
	labelPosition
} from '../../../services/utilsService'
import {
	getInsentives,
	deleteInsentive
} from '../../../services/insentiveService'
import CustomModal from '../../common/modal'
import Spinner from '../../common/spinner'

const SPIF = props => {
	const [insentives, setInsentives] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const [selectedInsentive, setSelectedInsentive] = useState(null)

	useEffect(() => {
		setIsLoading(false)
		getInsentives().then(data => {
			setInsentives(data)
			setIsLoading(true)
		})
	}, [])

	const [modal, setModal] = useState(false)

	const toggle = e => {
		setModal(!modal)

		if (e.target.name === 'primary') {
			if (!selectedInsentive) return

			deleteInsentive(selectedInsentive.id).then(data => {
				getInsentives().then(data => setInsentives(data))
				setSelectedInsentive(null)
			})
		}
	}

	const renderModal = () => {
		return (
			<CustomModal
				title='Infomatech'
				modal={modal}
				toggle={toggle}
				label={`Are you sure you want to delete?`}
				primary={{type: 'primary', label: 'DELETE'}}
			/>
		)
	}

	const columns = [
		{
			path: 'user.profile.lastname',
			label: 'Employee Name',
			content: ({user}) => {
				return toElipse(
					`${cap(user.profile.lastname)}, ${cap(user.profile.middlename)} ${cap(
						user.profile.firstname
					)}`,
					25
				)
			}
		},
		{
			path: 'user.profile.branch.name',
			label: 'Branch',
			content: incentive => cap(incentive.user.profile.branch.name)
		},
		{
			path: 'user.position',
			label: 'Position',
			content: incentive => labelPosition(incentive.user.position)
		},
		{
			path: 'user.profile.codeNo',
			label: 'Licence Code'
		},
		{
			path: 'count',
			label: 'Count Insured'
		},

		{
			path: 'prize',
			label: 'Prize Reward',
			content: insentive =>
				`₱${insentive.prize.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
		},
		{
			path: 'month',
			label: 'Month/Year',
			content: insentive => `${insentive.month}, ${insentive.year}`
		},
		{
			key: 'actions',
			path: 'count',
			label: 'Actions',
			content: insentive => (
				<button
					onClick={async e => {
						setModal(!modal)
						setSelectedInsentive(insentive)
					}}
					className='btn btn-sm btn-outline-danger ml-1'
				>
					DELETE
				</button>
			)
		}
	]

	const [sortColumn, setSortColumn] = useState({path: 'name', order: 'asc'})

	const handleSort = sortColumn => {
		setSortColumn(sortColumn)
		setInsentives(sortBy(insentives, sortColumn))
	}
	return (
		<React.Fragment>
			{renderModal()}
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
				<h1 className='h2'>Sales Performance Incentive Funds</h1>
				<button
					onClick={() => props.history.replace('/spif/new')}
					className='btn btn-sm btn-grad-primary ml-1'
				>
					<span className='fa fa-plus mr-1'></span>
					INCENTIVE
				</button>
			</div>
			<div className='col-12 m-0 p-0'>
				<Spinner
					className='mt-5 pt-5 col-12 d-flex justify-content-center'
					isLoaded={isLoading}
				>
					<Table
						columns={columns}
						data={insentives}
						sortColumn={sortColumn}
						onSort={handleSort}
					/>
				</Spinner>
			</div>
			<style jsx=''>{`
				.fa-plus {
					margin-top: 0 !important;
				}
			`}</style>
		</React.Fragment>
	)
}

export default SPIF
