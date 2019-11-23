import React, {useState, useContext, useEffect} from 'react'
import Form from '../../common/form'
import {toast} from 'react-toastify'
import Joi from 'joi-browser'
import {
	formatDate,
	cap,
	joiLettersOnly,
	joiMobileNumber,
	calculateAge
} from '../../../services/utilsService'

import {ClientContext} from '../../../context'
import Spinner from './../../common/spinner'
import {useMedia} from 'react-use'

const EditClient = props => {
	const {id} = props.match.params
	const [isLoaded, setIsLoaded] = useState(false)
	const isMobile = useMedia('(max-width: 600px)')
	const {getClientGPA, onUpdateClient, status} = useContext(ClientContext)

	const [client, setClient] = useState({
		firstname: '',
		lastname: '',
		middlename: '',
		address: '',
		contact: '',
		dateInsured: '',
		birthdate: '',
		codeNo: '',
		gender: '',
		civil: '',
		coverage: 0
	})

	const [selectedGender, setSelectedGender] = useState(null)
	const [selectedCoverage, setSelectedCoverage] = useState(null)
	const [selectedCivil, setSelectedCivil] = useState(null)
	const [errors, setErrors] = useState({})

	useEffect(() => {
		setIsLoaded(false)
		getClientGPA(id).then(
			({
				client: {
					id,
					isNear,
					isDue,
					isLapsed,
					mode,
					forApproval,
					userInsured,
					expiredDate,
					promo,
					branch,
					...client
				}
			}) => {
				setClient({
					...client,

					dateInsured: new Date(client.dateInsured).toLocaleDateString(),
					birthdate: client.birthdate
						? new Date(client.birthdate).toLocaleDateString()
						: ''
				})
				setSelectedCivil({
					id: 1,
					value: client ? client.civil : '',
					label: cap(client ? client.civil : '')
				})

				setSelectedGender({
					id: 2,
					value: client ? client.gender : '',
					label: cap(client ? client.gender : '')
				})

				setSelectedCoverage({
					id: 3,
					value: client.coverage,
					label: client.coverage + 'Year/s'
				})

				setIsLoaded(true)
			}
		)
	}, [])

	const schema = {
		firstname: joiLettersOnly('Firstname'),
		middlename: joiLettersOnly('Middlename'),
		lastname: joiLettersOnly('Lastname'),
		codeNo: Joi.number()
			.required()
			.label('Code Number'),
		contact: joiMobileNumber('Mobile Number'),
		address: Joi.optional(),
		coverage: Joi.number()
			.required()
			.label('Coverage'),
		dateInsured: Joi.string()
			.required()
			.label('Date Insured'),
		birthdate: Joi.string()
			.required()
			.label('Birthdate'),

		gender: Joi.string()
			.required()
			.label('Gender'),

		civil: Joi.string()
			.required()
			.label('Civil Status')
	}

	const handleChangeGender = gender => setSelectedGender(gender)
	const handleChangeCoverage = coverage => setSelectedCoverage(coverage)
	const handleChangeCivil = civil => setSelectedCivil(civil)

	const handleSubmit = async (e, client) => {
		const age = calculateAge(client.birthdate)

		if (age < 7 || age > 60) {
			setErrors({birthdate: '"Age" must be 7 to 60 years old!'})
			return
		}

		const _client = {
			...client,

			dateInsured: new Date(client.dateInsured).toISOString(),

			birthdate: new Date(client.birthdate).toISOString()
		}

		try {
			await onUpdateClient(id, _client)
			toast.success('Saved')
		} catch (error) {
			console.log(error)
		}
	}
	const coverages = [
		{
			id: 1,
			label: '1 Year',
			value: 1
		},
		{
			id: 2,
			label: '2 Years',
			value: 2
		},
		{
			id: 3,
			label: '3 Years',
			value: 3
		}
	]
	const genders = [
		{
			id: 1,
			label: 'Male',
			value: 'male'
		},
		{
			id: 2,
			label: 'Female',
			value: 'female'
		}
	]
	const civils = [
		{
			id: 1,
			value: 'single',
			label: 'Single'
		},
		{
			id: 2,
			value: 'married',
			label: 'Married'
		},
		{
			id: 3,
			value: 'divorced',
			label: 'Divorced'
		},
		{
			id: 4,
			value: 'widowed',
			label: 'Widowed'
		}
	]

	const handleDateInsured = date => {
		setClient({
			...client,

			dateInsured: formatDate(date)
		})
	}

	const handleBirthdate = date => {
		setClient({
			...client,
			birthdate: formatDate(date)
		})
	}
	return (
		<React.Fragment>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
				<h1 className='h2'>Edit Group Personal Accident</h1>
			</div>
			<Spinner isLoaded={isLoaded} className='spinner'>
				<Form
					data={{data: client, setData: setClient}}
					errors={{errors, setErrors}}
					onSubmit={handleSubmit}
					schema={schema}
				>
					{({
						renderInput,
						renderSelect,
						renderTextArea,
						renderDatePicker,
						renderButton
					}) => {
						return (
							<div className='row'>
								<div className={isMobile ? 'col-12' : 'col-6'}>
									{renderInput('firstname', 'Firstname')}
									{renderInput('middlename', 'Middlename')}
									{renderInput('lastname', 'Lastname')}
									<div className='row m-0 p-0'>
										<div
											className={
												isMobile ? 'col-12 px-0' : 'col-6 m-0 py-0 pl-0 pr-2'
											}
										>
											{renderSelect(
												'gender',
												'Gender',
												selectedGender,
												handleChangeGender,
												genders
											)}
										</div>
										<div
											className={
												isMobile ? 'col-12 px-0' : 'col-6 m-0 py-0 pr-0 pl-2'
											}
										>
											{renderSelect(
												'civil',
												'Civil Status',
												selectedCivil,
												handleChangeCivil,
												civils
											)}
										</div>
									</div>
									{renderDatePicker('birthdate', 'Birthdate', {
										onChange: handleBirthdate
									})}
									{renderInput('contact', 'Mobile Contact')}
									{renderTextArea('address', 'Address')}
								</div>

								<div className={isMobile ? 'col-12' : 'col-6'}>
									{renderDatePicker('dateInsured', 'Date Insured', {
										onChange: handleDateInsured
									})}

									{renderInput('codeNo', 'GPA No.')}
									{renderSelect(
										'coverage',
										'Coverage',
										selectedCoverage,
										handleChangeCoverage,
										coverages
									)}
									{renderButton('UPDATE', null, 'Updating...', true)}
									<button
										onClick={e => {
											e.preventDefault()
											props.history.replace('/clients/gpa')
										}}
										className='btn btn-grad-secondary btn-block'
										name='back'
									>
										Back
									</button>
								</div>
							</div>
						)
					}}
				</Form>
			</Spinner>

			<style jsx=''>{`
				.spinner {
					margin-top: 200px;
					margin-bottom: 200px;
				}
			`}</style>
		</React.Fragment>
	)
}

export default EditClient
