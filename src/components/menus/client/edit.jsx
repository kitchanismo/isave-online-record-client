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
import {getPromos} from '../../../services/userService'
import {useMedia} from 'react-use'

const EditClient = props => {
	const {id} = props.match.params
	const [isLoaded, setIsLoaded] = useState(false)
	const isMobile = useMedia('(max-width: 600px)')
	const {getClient, onUpdateClient, status} = useContext(ClientContext)

	const [promos, setPromos] = useState([])

	const [client, setClient] = useState({
		firstname: '',
		lastname: '',
		middlename: '',
		address: '',
		contact: '',
		dateInsured: '',
		expiredDate: '',
		birthdate: '',
		codeNo: '',
		promo: '',
		userInsured: '',
		gender: '',
		mode: '',
		civil: '',
		forApproval: true
	})

	const [selectedPromo, setSelectedPromo] = useState(null)
	const [selectedGender, setSelectedGender] = useState(null)
	const [selectedMode, setSelectedMode] = useState(null)
	const [selectedCivil, setSelectedCivil] = useState(null)
	const [errors, setErrors] = useState({})

	useEffect(() => {
		setIsLoaded(false)
		getClient(id).then(
			({
				client: {
					id,
					insuredUser,
					branch,
					coverage,
					isNear,
					isDue,
					isLapsed,
					...client
				}
			}) => {
				setClient({
					...client,
					promo: client.promo.value,
					expiredDate: new Date(client.expiredDate).toLocaleDateString(),
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

				setSelectedMode({
					id: 3,
					value: client ? client.mode : '',
					label: cap(client ? client.mode : '')
				})

				setSelectedPromo({
					...client.promo,
					label: cap(client.promo ? client.promo.label : '')
				})

				setIsLoaded(true)
			}
		)
		getPromos().then(promos => {
			setPromos(promos)
		})
	}, [])

	const codeNoValidation = () => {
		return (
			Joi.string()
				//.regex(/^(\d+-?)+\d+$/)
				.regex(/^[a-zA-Z0-9-]+$/)
				.error(errors => {
					errors.forEach(err => {
						switch (err.type) {
							case 'string.regex.base':
								err.message =
									'"Policy Number" must only have a number and letter with hyphen'
								break
							case 'string.min':
								err.message =
									'"Policy Number" must be equal to 15 characters long'
								break
							case 'string.max':
								err.message =
									'"Policy Number" must be equal to 15 characters long'
								break
							default:
								break
						}
					})
					return errors
				})
				.min(15)
				.max(15)
				.label('Policy Number')
		)
	}

	const schema = {
		firstname: joiLettersOnly('Firstname'),
		middlename: joiLettersOnly('Middlename'),
		lastname: joiLettersOnly('Lastname'),
		codeNo: codeNoValidation(),
		contact: joiMobileNumber('Mobile Number'),
		address: Joi.optional(),
		expiredDate: Joi.optional(),
		dateInsured: Joi.string()
			.required()
			.label('Date Insured'),
		birthdate: Joi.string()
			.required()
			.label('Birthdate'),
		forApproval: Joi.optional(),
		userInsured: Joi.optional(),
		gender: Joi.string()
			.required()
			.label('Gender'),
		mode: Joi.string()
			.required()
			.label('Mode of Payment'),
		civil: Joi.string()
			.required()
			.label('Civil Status'),
		promo: Joi.string()
			.required()
			.label('Promo Officer')
	}

	const handleChangeGender = gender => setSelectedGender(gender)

	const handleChangeCivil = civil => setSelectedCivil(civil)

	const handleChangeMode = mode => {
		setSelectedMode(mode)

		if (mode) {
			const expiredDate = getExpiredDate(client.dateInsured, mode.value)

			setClient({
				...client,
				mode: mode.value,
				expiredDate
			})
		}
	}
	const handleChangePromo = promo => setSelectedPromo(promo)

	const getExpiredDate = (date, mode) => {
		const dateInsured = new Date(date)

		const expiredDate = new Date(dateInsured)

		expiredDate.setMonth(dateInsured.getMonth() + getAddedMonth(mode))

		return formatDate(expiredDate)
	}

	const handleSubmit = async (e, client) => {
		const age = calculateAge(client.birthdate)

		if (age < 7 || age > 60) {
			setErrors({birthdate: '"Age" must be 7 to 60 years old!'})
			return
		}

		if (client.codeNo === '') {
			setErrors({codeNo: `"Policy Number" is not allowed to be empty`})
			return
		}
		const expiredDate = getExpiredDate(client.dateInsured, selectedMode.value)

		const _client = {
			...client,
			mode: selectedMode ? selectedMode.value : '',
			dateInsured: new Date(client.dateInsured).toISOString(),
			expiredDate: new Date(expiredDate).toISOString(),
			birthdate: new Date(client.birthdate).toISOString(),
			promo: selectedPromo.id
		}

		try {
			await onUpdateClient(id, _client)
			toast.success('Saved')
		} catch (error) {
			console.log(error)
		}
	}

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
	const modes = [
		{
			id: 1,
			value: 'monthly',
			label: 'Monthly'
		},
		{
			id: 2,
			value: 'quarterly',
			label: 'Quarterly'
		},
		{
			id: 3,
			value: 'semi',
			label: 'Semi-Annually'
		},
		{
			id: 4,
			value: 'annually',
			label: 'Annually'
		}
	]

	const getAddedMonth = mode => {
		switch (mode) {
			case 'monthly':
				return 1
			case 'quarterly':
				return 3
			case 'semi':
				return 6
			case 'annually':
				return 12
			default:
				return 0
		}
	}

	const handleDateInsured = date => {
		const expiredDate = selectedMode
			? getExpiredDate(date, selectedMode.value)
			: ''

		setClient({
			...client,
			expiredDate,
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
				<span className='m-0 p-0'>
					<h1 className='h2'>Client Record Management</h1>
					<h5 className='text-secondary'>Edit Client</h5>
				</span>
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
									<div className='row m-0 p-0'>
										<div
											className={
												isMobile ? 'col-12 px-0' : 'col-6 m-0 py-0 pl-0 pr-2'
											}
										>
											{renderDatePicker('dateInsured', 'Date Insured', {
												onChange: handleDateInsured
											})}
										</div>
										<div
											className={
												isMobile ? 'col-12 px-0' : 'col-6 m-0 py-0 pr-0 pl-2'
											}
										>
											{renderInput('expiredDate', 'Due Date', 'text', '', {
												disabled: true
											})}
										</div>
									</div>
									{renderSelect(
										'mode',
										'Mode of Payment',
										selectedMode,
										handleChangeMode,
										modes
									)}

									{renderSelect(
										'promo',
										'Promo Officer',
										selectedPromo,
										handleChangePromo,
										promos
									)}
									{renderInput('codeNo', 'Policy No')}

									{renderButton('UPDATE', null, 'Updating...', true)}
									<button
										onClick={e => {
											e.preventDefault()
											props.history.replace('/clients/enforced')
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
