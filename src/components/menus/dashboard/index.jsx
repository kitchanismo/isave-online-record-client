import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import Charts from './charts'
import {useMedia} from 'react-use'
import {insuredYears} from '../../../services/clientService'

const Dashboard = props => {
	const now = new Date(Date.now())
	const isMobile = useMedia('(max-width: 600px)')
	const months = [
		{id: 1, label: 'January', value: 0},
		{id: 2, label: 'February', value: 1},
		{id: 3, label: 'March', value: 2},
		{id: 4, label: 'April', value: 3},
		{id: 5, label: 'May', value: 4},
		{id: 6, label: 'June', value: 5},
		{id: 7, label: 'July', value: 6},
		{id: 8, label: 'August', value: 7},
		{id: 9, label: 'September', value: 8},
		{id: 10, label: 'October', value: 9},
		{id: 11, label: 'November', value: 10},
		{id: 12, label: 'December', value: 11}
	]
	const [years, setYears] = useState([])

	useEffect(() => {
		insuredYears().then(years => {
			const _years = years.map((year, i) => {
				return {
					id: i + 1,
					value: '' + year,
					label: '' + year
				}
			})
			setYears(_years)
		})
	}, [])

	// const years = [
	// 	{
	// 		id: 1,
	// 		label: '2017',
	// 		value: '2017'
	// 	},
	// 	{
	// 		id: 2,
	// 		label: '2018',
	// 		value: '2018'
	// 	},
	// 	{
	// 		id: 3,
	// 		label: '2019',
	// 		value: '2019'
	// 	},
	// 	{
	// 		id: 4,
	// 		label: '2020',
	// 		value: '2020'
	// 	}
	// ]

	const [year, setYear] = useState({
		id: 1,
		value: now.getFullYear(),
		label: now.getFullYear().toString()
	})

	const getCurrentMonthLabel = () => {
		return months.filter(month => month.value === now.getMonth())[0].label
	}

	const [month, setMonth] = useState({
		id: 1,
		value: now.getMonth(),
		label: getCurrentMonthLabel()
	})

	const handleOnChangeYear = year => setYear(year)

	const handleOnChangeMonth = month => setMonth(month)

	return (
		<React.Fragment>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
				<h1 className='h2'>Dashboard</h1>
				<div className='category-dashboard row m-0 p-0 d-flex'>
					<div style={{width: 140}} className='mr-2'>
						SPIF Month:
						<Select
							isSearchable
							value={month}
							onChange={handleOnChangeMonth}
							options={months}
						/>
					</div>
					<div style={{width: 100}}>
						Statistic Year:
						<Select
							isSearchable
							value={year}
							onChange={handleOnChangeYear}
							options={years}
						/>
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-12 mt-3'>
					<Charts
						data={{year: year.value, month: month.label.toLowerCase()}}
					></Charts>
				</div>
			</div>

			<style jsx=''>{`
				.fa-plus {
					margin-top: 0 !important;
				}

				.category-dashboard {
					margin-top: ${isMobile ? '10px' : '-10px'} !important;
				}
			`}</style>
		</React.Fragment>
	)
}

export default Dashboard
