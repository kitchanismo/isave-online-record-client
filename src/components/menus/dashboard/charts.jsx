import React, {useState, useEffect} from 'react'
import Chart from 'react-apexcharts'
import {NavLink} from 'react-router-dom'
import {theme} from '../../../config.json'
import useReport from '../../../hooks/useReport'
import {formatDate} from '../../../services/utilsService'
import {getStatistics} from '../../../services/clientService'
import Spinner from './../../common/spinner'

const useOptions = title => {
	const [series, setSeries] = useState([
		{
			name: 'series-1',
			data: []
		}
	])
	const [options] = useState({
		theme: {
			palette: 'palette5'
		},
		chart: {
			id: 'basic-bar',
			toolbar: {
				show: false
			}
		},
		xaxis: {
			categories: [
				'JAN',
				'FEB',
				'MAR',
				'APR',
				'MAY',
				'JUN',
				'JUL',
				'AUG',
				'SEP',
				'OCT',
				'NOV',
				'DEC'
			]
		},
		title: {
			text: title,
			align: 'center',
			margin: 10,
			offsetX: 0,
			offsetY: 0,
			floating: false,
			style: {
				fontSize: '20px',
				color: theme.secondary
			}
		},
		grid: {
			show: true,
			borderColor: 'black',
			strokeDashArray: 1,
			position: 'back',
			xaxis: {
				lines: {
					show: false
				}
			},
			yaxis: {
				lines: {
					show: false
				}
			},
			row: {
				colors: undefined,
				opacity: 0.5
			},
			column: {
				colors: undefined,
				opacity: 0.5
			},
			padding: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			}
		}
	})

	return {options, series, setSeries}
}

const Charts = props => {
	const {reports = [], isLoaded} = useReport('policy-monitoring')

	const [isLoadedStat, setIsLoadedStat] = useState(false)

	const {options: fspOptions, series: fsp, setSeries: setFSP} = useOptions(
		'2019 Future Savings Plan Statistic'
	)

	const {options: gpaOptions, series: gpa, setSeries: setGPA} = useOptions(
		'2019 Group Personal Accident Statistic'
	)

	useEffect(() => {
		setIsLoadedStat(false)
		getStatistics().then(data => {
			setFSP([{name: 'series-1', data: data.fsp}])
			setGPA([{name: 'series-1', data: data.gpa}])
			setIsLoadedStat(true)
		})
	}, [])

	const remarksColor = remarks => {
		if (remarks === 'near expiration') return 'warning'
		if (remarks === 'on due' || remarks === 'on lapsed') return 'danger'

		return 'info'
	}
	const toView = remarks => {
		if (remarks === 'near expiration') return '/clients/near-expiration'
		if (remarks === 'on due') return '/clients/due'
		if (remarks === 'on lapsed') return '/clients/lapsed'

		return '/clients/for-approval'
	}

	const chart = () => (
		<React.Fragment>
			<Spinner isLoaded={isLoaded} className='spinner'>
				<div className='row d-flex justify-content-around mx-2'>
					<ul className='list-group'>
						<li className='header-list pb-0 list-group-item d-flex justify-content-between align-items-center'>
							<span className='font-weight-bold'>Policy Monitoring</span>
							<span className='badge badge-danger badge-pill'>
								{reports.length ? reports.length : ''}
							</span>
						</li>
						<li className='header-list py-1 list-group-item d-flex justify-content-between align-items-center'>
							<span style={{color: '#eee'}} className='font-weight-light'>
								Name
							</span>
							<span style={{color: '#eee'}} className='font-weight-light'>
								Remarks
							</span>
						</li>
						<div className='wrapper-list'>
							{reports.map(client => (
								<li className='list-group-item d-flex justify-content-between align-items-center'>
									<NavLink
										title='View details'
										className='link-policy'
										to={toView(client.remarks)}
									>
										{`${client.lastname}, ${client.firstname} ${client.middlename}`}
									</NavLink>
									<span
										className={`badge badge-${remarksColor(
											client.remarks
										)} badge-pill`}
									>
										{client.remarks}
									</span>
								</li>
							))}
							{reports.length === 0 && isLoaded && (
								<li className='list-group-item d-flex justify-content-between align-items-center'>
									No record/s found!
								</li>
							)}
						</div>
					</ul>

					<ul className='list-group'>
						<li className='header-list pb-0 list-group-item d-flex justify-content-between align-items-center'>
							<span className='font-weight-bold'>
								Sales Performance Insentive Fund
							</span>
						</li>
						<li className='header-list py-1 list-group-item d-flex justify-content-between align-items-center'>
							<span style={{color: '#eee'}} className='font-weight-light'>
								Name
							</span>
							<span style={{color: '#eee'}} className='font-weight-light'>
								Month
							</span>
						</li>
						<li className='list-group-item d-flex justify-content-between align-items-center'>
							<NavLink title='View details' className='link-policy' to={'/'}>
								Lname, Fname Mname
							</NavLink>
							<span className={`badge badge-info badge-pill`}>November</span>
						</li>
						{/* <li className='list-group-item d-flex justify-content-between align-items-center'>
							No record/s found!
						</li> */}
					</ul>
				</div>

				<div className='row d-flex mt-4 justify-content-around'>
					<Chart
						key='Sales'
						type='line'
						options={fspOptions}
						series={fsp}
						width='410px'
					/>
					<Chart
						key='FSF'
						type='line'
						options={gpaOptions}
						series={gpa}
						width='410px'
					/>
				</div>
			</Spinner>
			<style jsx=''>{`
				.list-group {
					width: 400px !important;
				}

				.header-list {
					background-color: ${theme.secondary};
					border-color: ${theme.secondary};
					color: white;
				}

				.spinner {
					margin-top: 110px;
				}

				.fa-check,
				.fa-close {
					margin-top: 0 !important;
				}

				.wrapper-list {
					margin: 0;
					padding: 0;
					height: 180px;
					overflow-x: hidden;
					overflow-y: auto;
				}
				.link-policy {
					color: ${theme.secondary};
				}
			`}</style>
		</React.Fragment>
	)

	return <div>{chart()}</div>
}

export default Charts
