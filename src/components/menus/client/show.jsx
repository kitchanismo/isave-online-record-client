import React, {useEffect, useState, useRef} from 'react'
import {getClient} from '../../../services/clientService'
import {cap, formatDate} from '../../../services/utilsService'
import ReactToPrint from 'react-to-print'
import Spinner from './../../common/spinner'
import {useMedia} from 'react-use'

const ShowClient = props => {
	const {id} = props.match.params
	const [isFS, setIsFS] = useState(true)
	const isMobile = useMedia('(max-width: 600px)')

	useEffect(() => {
		const url = props.match.url

		if (url.match(/fs.*/)) {
			setIsFS(true)
		}

		if (url.match(/gpa.*/)) {
			setIsFS(false)
		}
	}, [])

	const [isLoading, setIsLoading] = useState(true)

	const [client, setClient] = useState({
		firstname: '',
		lastname: '',
		middlename: '',
		address: '',
		contact: '',
		dateInsured: '', //
		expiredDate: '', //
		birthdate: '',
		codeNo: '',
		promo: '', //
		userInsured: '', //
		gender: '',
		mode: '', //
		civil: '',
		branch: ''
	})

	useEffect(() => {
		setIsLoading(true)
		getClient(id).then(({client}) => {
			setClient(client)
			setIsLoading(false)
		})
	}, [])

	const componentRef = useRef()

	return (
		<React.Fragment>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
				<span className='m-0 p-0'>
					<h1 className='h2'>Client Record Management</h1>
					<h5 className='text-secondary'>Client Details</h5>
				</span>

				<div className='row m-0 p-0'>
					<div className='col-9 m-0 p-0'>
						<ReactToPrint
							trigger={() => (
								<button className='btn btn-sm btn-grad-primary'>
									<span className='fa fa-print mr-1'></span>
									PRINT PREVIEW
								</button>
							)}
							content={() => componentRef.current}
						></ReactToPrint>
					</div>
					<div className='col-3 m-0 p-0'>
						<button
							onClick={e => {
								e.preventDefault()
								props.history.replace(`/clients/${isFS ? 'enforced' : 'gpa'}`)
							}}
							className='btn btn-grad-secondary mb-2 btn-sm btn-block'
							name='back'
						>
							Back
						</button>
					</div>
				</div>
			</div>
			<div className='row m-0 p-0 d-flex justify-content-end'></div>
			<Spinner className='mt-5 pt-5' isLoaded={!isLoading}>
				{!isMobile && (
					<div ref={componentRef} className='wrapper-content px-5 mb-3'>
						<h5 className='text-center mb-3 pt-5'>INFOMATECH SURVEY SHEET</h5>

						<h5 className='text-center mb-1'>Personal Information</h5>
						<hr className='my-0'></hr>

						<div className='row mt-2'>
							<div className='col-6 pl-4'>
								<p>Lastname:</p>
								<p>Firstname:</p>
								<p>Middlename:</p>
								<p>Gender:</p>
								<p>Birthdate:</p>
								<p>Address:</p>
								<p>Contact:</p>
								<p>Civil Status:</p>
							</div>
							<div className='col-6'>
								<p className='text-secondary'>{cap(client.lastname)}</p>
								<p className='text-secondary'>{cap(client.firstname)}</p>
								<p className='text-secondary'>{cap(client.middlename)}</p>
								<p className='text-secondary'>{cap(client.gender)}</p>
								<p className='text-secondary'>{formatDate(client.birthdate)}</p>
								<p className='text-secondary'>
									{client.address ? cap(client.address) : 'N/A'}
								</p>
								<p className='text-secondary'>{cap(client.contact)}</p>
								<p className='text-secondary'>{cap(client.civil)}</p>
							</div>
						</div>

						<h5 className='text-center mb-1'>Other Information</h5>
						<hr className='my-0'></hr>
						{isFS && (
							<React.Fragment>
								<div className='row mt-2'>
									<div className='col-6 pl-4'>
										<p>Policy Number:</p>
										<p>Mode of Payment:</p>
										<p>Date Insured:</p>
										<p>Due Date:</p>
										<p>
											{client.promo.position === 'manager'
												? 'Manager:'
												: 'Sales Officer:'}
										</p>
										<p>Promo Officer:</p>
										<p>Branch:</p>
									</div>
									<div className='col-6'>
										<p className='text-secondary'>{client.codeNo}</p>
										<p className='text-secondary'>{cap(client.mode)}</p>
										<p className='text-secondary'>
											{formatDate(client.dateInsured)}
										</p>
										<p className='text-secondary'>
											{formatDate(client.expiredDate)}
										</p>
										<p className='text-secondary'>{cap(client.insuredUser)}</p>
										<p className='text-secondary'>{cap(client.promo.label)}</p>
										<p className='text-secondary'>{cap(client.branch)}</p>
									</div>
								</div>
							</React.Fragment>
						)}
						{!isFS && (
							<React.Fragment>
								<div className='row mt-2'>
									<div className='col-6 pl-4'>
										<p>Policy Number:</p>
										<p>Coverage:</p>
										<p>Date Insured:</p>
										<p>User Insured:</p>
										<p>Branch:</p>
									</div>
									<div className='col-6'>
										<p className='text-secondary'>{client.codeNo}</p>
										<p className='text-secondary'>{cap(client.coverage)}</p>
										<p className='text-secondary'>
											{formatDate(client.dateInsured)}
										</p>

										<p className='text-secondary'>{cap(client.insuredUser)}</p>

										<p className='text-secondary'>{cap(client.branch)}</p>
									</div>
								</div>
							</React.Fragment>
						)}
					</div>
				)}

				{isMobile && (
					<React.Fragment>
						<h5 className='text-center mb-3'>INFOMATECH SURVEY SHEET</h5>

						<div className='card mb-2' style={{width: 'auto'}}>
							<h5 className='text-center mb-0 mt-3'>Personal Information</h5>
							<hr></hr>
							<div className='card-body pt-0 text-center'>
								<p className='card-title mt-2'>Lastname:</p>
								<p className='card-subtitle mt-2 text-secondary'>
									{cap(client.lastname)}
								</p>
								<p className='card-title mt-2'>Firstname:</p>
								<p className='card-subtitle mt-2 text-secondary'>
									{cap(client.firstname)}
								</p>
								<p className='card-title mt-2'>Middlename:</p>
								<p className='card-subtitle mt-2 text-secondary'>
									{cap(client.middlename)}
								</p>
								<p className='card-title mt-2'>Gender:</p>
								<p className='card-subtitle mt-2 text-secondary'>
									{cap(client.gender)}
								</p>
								<p className='card-title mt-2'>Birhtdate:</p>
								<p className='card-subtitle mt-2 text-secondary'>
									{formatDate(client.birthdate)}
								</p>
								<p className='card-title mt-2'>Address:</p>
								<p className='card-subtitle mt-2 text-secondary'>
									{client.address ? cap(client.address) : 'N/A'}
								</p>
								<p className='card-title mt-2'>Contact:</p>
								<p className='card-subtitle mt-2 text-secondary'>
									{client.contact}
								</p>
								<p className='card-title mt-2'>Civil Status:</p>
								<p className='card-subtitle mt-2 text-secondary'>
									{cap(client.civil)}
								</p>
							</div>
						</div>

						<div className='card mb-2' style={{width: 'auto'}}>
							<h5 className='text-center mb-0 mt-3'>Other Information</h5>
							<hr></hr>
							<div className='card-body pt-0 text-center'>
								<p className='card-title mt-2'>Policy Number:</p>
								<p className='card-subtitle mt-2 text-secondary'>
									{client.codeNo}
								</p>
								<p className='card-title mt-2'>
									{isFS ? 'Mode of Payment' : 'Coverage'}:
								</p>
								<p className='card-subtitle mt-2 text-secondary'>
									{isFS ? cap(client.mode) : client.coverage}
								</p>
								<p className='card-title mt-2'>Date Insured:</p>
								<p className='card-subtitle mt-2 text-secondary'>
									{formatDate(client.dateInsured)}
								</p>
								{isFS && <p className='card-title mt-2'>Due Date:</p>}
								{isFS && (
									<p className='card-subtitle mt-2 text-secondary'>
										{formatDate(client.expiredDate)}
									</p>
								)}
								<p className='card-title mt-2'>Sales Officer:</p>
								<p className='card-subtitle mt-2 text-secondary'>
									{cap(client.insuredUser)}
								</p>
								{isFS && <p className='card-title mt-2'>Promo Officer:</p>}
								{isFS && (
									<p className='card-subtitle mt-2 text-secondary'>
										{cap(client.promo.label)}
									</p>
								)}
								<p className='card-title mt-2'>Branch:</p>
								<p className='card-subtitle mt-2 text-secondary'>
									{cap(client.branch)}
								</p>
							</div>
						</div>
					</React.Fragment>
				)}
			</Spinner>
			<style jsx=''>{`
				.wrapper-content {
					background-color: white;

					border-radius: 5px;
				}
				.fa-print {
					margin-top: 0 !important;
				}
				hr {
					color: gray;
				}
			`}</style>
		</React.Fragment>
	)
}

export default ShowClient
