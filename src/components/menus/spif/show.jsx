import React, {useEffect, useState} from 'react'
import {getInsentive} from '../../../services/insentiveService'
import {cap} from '../../../services/utilsService'
import Spinner from '../../common/spinner'
import {useMedia} from 'react-use'

const ShowInsentive = props => {
	const {id} = props.match.params
	const isMobile = useMedia('(max-width: 600px)')
	const [insentive, setInsentive] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		getInsentive(id).then(data => {
			setInsentive(data)
			setIsLoading(false)
		})
	}, [])

	const labelPosition = position => {
		switch (position) {
			case 'admin':
				return 'System Administrator'
			case 'general':
				return 'General Manager'
			case 'manager':
				return 'Branch Manager'
			case 'sales':
				return 'Sales Officer'
			case 'promo':
				return 'Promo Officer'
			default:
				return ''
		}
	}

	return (
		<React.Fragment>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
				<span>
					<h1 className='h2'>Sales Performance Incentive Funds</h1>
					<h5 className='text-secondary'>Incentive Details</h5>
				</span>
				<button
					onClick={() => props.history.replace('/dashboard')}
					className='btn btn-sm btn-grad-secondary ml-1'
				>
					Back
				</button>
			</div>
			<Spinner className='mt-5 pt-5' isLoaded={!isLoading}>
				{!isMobile && (
					<div className='insentive-wrapper row mx-2 pt-5'>
						<div className='col-4 offset-2 text-right'>
							<p>Firstname:</p>
							<p>Middlename:</p>
							<p>Lastname:</p>
							<p>License Code:</p>
							<p>Branch:</p>
							<p>Position:</p>
							<p>Client Count Insured:</p>
							<p>Prize:</p>
							<p>Month/Year:</p>
						</div>
						<div className='col-4 text-left'>
							<p className='text-secondary'>
								{insentive ? cap(insentive.user.profile.firstname) : ''}
							</p>
							<p className='text-secondary'>
								{insentive ? cap(insentive.user.profile.middlename) : ''}
							</p>
							<p className='text-secondary'>
								{insentive ? cap(insentive.user.profile.lastname) : ''}
							</p>
							<p className='text-secondary'>
								{insentive ? cap(insentive.user.profile.codeNo) : ''}
							</p>
							<p className='text-secondary'>
								{insentive ? cap(insentive.user.profile.branch.name) : ''}
							</p>
							<p className='text-secondary'>
								{insentive ? labelPosition(insentive.user.position) : ''}
							</p>
							<p className='text-secondary'>
								{insentive ? cap(insentive.count) : ''}
							</p>
							<p className='text-secondary'>
								{insentive ? `₱${cap(insentive.prize)}` : ''}
							</p>
							<p className='text-secondary'>
								{insentive
									? `${cap(insentive.month)}, ${cap(insentive.year)}`
									: ''}
							</p>
						</div>
					</div>
				)}

				{isMobile && (
					<div className='card text-center' style={{width: 'auto'}}>
						<h5 className='card-title mt-3 mb-0'>Employee Details</h5>
						<hr></hr>
						<div className='card-body mt-0 pt-0'>
							<p className='card-subtitle'>Firstname:</p>
							<p className='text-secondary'>
								{insentive ? cap(insentive.user.profile.firstname) : ''}
							</p>

							<p className='card-subtitle'>Middlename:</p>
							<p className='text-secondary'>
								{insentive ? cap(insentive.user.profile.middlename) : ''}
							</p>

							<p className='card-subtitle'>License Code:</p>
							<p className='text-secondary'>
								{insentive ? cap(insentive.user.profile.codeNo) : ''}
							</p>

							<p className='card-subtitle'>Branch:</p>
							<p className='text-secondary'>
								{insentive ? cap(insentive.user.profile.branch.name) : ''}
							</p>

							<p className='card-subtitle'>Position:</p>
							<p className='text-secondary'>
								{insentive ? labelPosition(insentive.user.position) : ''}
							</p>
							<p className='card-subtitle'>Count:</p>
							<p className='text-secondary'>
								{insentive ? cap(insentive.count) : ''}
							</p>
							<p className='card-subtitle'>Prize:</p>
							<p className='text-secondary'>
								{insentive ? `₱${cap(insentive.prize)}` : ''}
							</p>
							<p className='card-subtitle'>Month/Year:</p>
							<p className='text-secondary'>
								{insentive
									? `${cap(insentive.month)}, ${cap(insentive.year)}`
									: ''}
							</p>
						</div>
					</div>
				)}
			</Spinner>
			<style jsx=''>{`
				.insentive-wrapper {
					background-color: white;
				}
			`}</style>
		</React.Fragment>
	)
}

export default ShowInsentive
