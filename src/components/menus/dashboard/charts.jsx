import React, {useState, useEffect} from 'react'
import Chart from 'react-apexcharts'
import {NavLink} from 'react-router-dom'
import {theme} from '../../../config.json'
import useReport from '../../../hooks/useReport'
import {formatDate, toElipse, cap} from '../../../services/utilsService'
import {getStatistics} from '../../../services/clientService'
import Spinner from './../../common/spinner'
import {getInsentives} from '../../../services/insentiveService.js'
import {useMedia} from 'react-use'

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
	const isMobile = useMedia('(max-width: 600px)')

	const {reports = [], isLoaded} = useReport('policy-monitoring')

	const [insentives, setInsentives] = useState([])

	const [isLoadedStat, setIsLoadedStat] = useState(false)

	const currentYear = new Date(Date.now()).getFullYear()

	const {options: fspOptions, series: fsp, setSeries: setFSP} = useOptions(
		currentYear +
			(isMobile ? ' FSP Statistic' : ' Future Savings Plan Statistic')
	)

	const {options: gpaOptions, series: gpa, setSeries: setGPA} = useOptions(
		currentYear +
			(isMobile ? ' GPA Statistic' : ' Group Personal Accident Statistic')
	)

	useEffect(() => {
		setIsLoadedStat(false)
		getStatistics(currentYear).then(data => {
			setFSP([{name: 'count', data: data.fsp}])
			setGPA([{name: 'count', data: data.gpa}])
			setIsLoadedStat(true)
		})
		getInsentives().then(data => setInsentives(data))
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

	const toTrim = str => {
		return isMobile ? toElipse(str, 15) : str
	}

	const chart = () => (
		<React.Fragment>
			<Spinner isLoaded={isLoaded && isLoadedStat} className='spinner'>
				<div
					className={`row d-flex justify-content-around mx-${
						isMobile ? '0' : '2'
					}`}
				>
					<ul className={`list-group ${isMobile ? '' : ''}`}>
						<li className='header-list pb-0 list-group-item d-flex justify-content-between align-items-center'>
							<span className='font-weight-bold'>Policy Monitoring</span>
							<span className='badge badge-danger badge-pill'>
								{reports.length ? reports.length : ''}
							</span>
						</li>
						<li className='header-list py-1 list-group-item d-flex justify-content-between align-items-center'>
							<span style={{color: '#eee'}} className='font-weight-light'>
								Client Name
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
										{toTrim(
											`${cap(client.lastname)}, ${cap(client.firstname)} ${cap(
												client.middlename
											)}`
										)}
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

					<ul className={`list-group ${isMobile ? 'mt-3' : ''}`}>
						<li className='header-list pb-0 list-group-item d-flex justify-content-between align-items-center'>
							<span className='font-weight-bold'>
								Sales Performance Incentive Fund
							</span>
							<span className='badge badge-danger badge-pill'>
								{insentives.length ? insentives.length : ''}
							</span>
						</li>
						<li className='header-list py-1 list-group-item d-flex justify-content-between align-items-center'>
							<span style={{color: '#eee'}} className='font-weight-light'>
								Employee Name
							</span>
							<span style={{color: '#eee'}} className='font-weight-light'>
								Prize
							</span>
						</li>
						<div className='wrapper-list'>
							{insentives.map(insentive => (
								<li className='list-group-item d-flex justify-content-between align-items-center'>
									<NavLink
										title='View details'
										className='link-policy'
										to={'/spif/' + insentive.id}
									>
										{toTrim(
											`${cap(insentive.user.profile.lastname)}, ${cap(
												insentive.user.profile.firstname
											)} ${cap(insentive.user.profile.middlename)}`
										)}
									</NavLink>
									<span className={`badge badge-info badge-pill`}>
										₱
										{insentive.prize
											.toFixed(2)
											.replace(/\d(?=(\d{3})+\.)/g, '$&,')}
									</span>
								</li>
							))}
							{insentives.length === 0 && (
								<li className='list-group-item d-flex justify-content-between align-items-center'>
									No record/s found!
								</li>
							)}
						</div>
					</ul>
				</div>

				<div
					className={`row d-flex ${
						isMobile ? 'mt-2' : 'mt-5'
					} justify-content-around`}
				>
					<Chart
						key='Sales'
						type='line'
						options={fspOptions}
						series={fsp}
						width={isMobile ? '285px' : '410px'}
					/>
					<Chart
						key='FSF'
						type='line'
						options={gpaOptions}
						series={gpa}
						width={isMobile ? '285' : '410px'}
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
