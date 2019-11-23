import React, {useState, useContext, useEffect} from 'react'
import Form from '../../common/form'
import {toast} from 'react-toastify'
import Joi from 'joi-browser'
import {
	formatDate,
	joiLettersOnly,
	joiMobileNumber,
	calculateAge,
	getExpiredDate
} from '../../../services/utilsService'
import auth from '../../../services/authService'
import {getPromos} from '../../../services/userService'
import {ClientContext} from '../../../context'
import Help from './../../common/help'
import ReactTooltip from 'react-tooltip'
import {useMedia} from 'react-use'

const AddClient = props => {
	const isMobile = useMedia('(max-width: 600px)')
	const {onAddClient, status} = useContext(ClientContext)
	const [promos, setPromos] = useState([])

	useEffect(() => {
		getPromos().then(promos => {
			setPromos(promos)
			if (promos.length === 0) toast.warning('No Promo Officers  Available!')
		})
	}, [])

	const [client, setClient] = useState({
		firstname: '',
		lastname: '',
		middlename: '',
		address: '',
		contact: '',
		birthdate: '',
		promo: '',
		dateInsured: formatDate(Date.now()),
		expiredDate: '',
		codeNo: '',
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

	const codeNoValidation = () => {
		return client.forApproval
			? Joi.optional()
			: Joi.string()
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
	}

	const schema = {
		firstname: joiLettersOnly('Firstname'),
		middlename: joiLettersOnly('Middlename'),
		lastname: joiLettersOnly('Lastname'),
		codeNo: codeNoValidation(),
		contact: joiMobileNumber('Mobile Contact'),
		address: Joi.optional(),
		expiredDate: Joi.optional(),
		birthdate: Joi.string()
			.required()
			.label('Birthdate'),
		dateInsured: Joi.optional(),
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

	const handleChangePromo = promo => setSelectedPromo(promo)

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

	const handleSubmit = async (e, client) => {
		const age = calculateAge(client.birthdate)

		if (age < 7 || age > 60) {
			setErrors({birthdate: '"Age" must be 7 to 60 years old!'})
			return
		}

		if (!client.forApproval && client.codeNo === '') {
			setErrors({codeNo: `"Policy Number" is not allowed to be empty`})
			return
		}

		const expiredDate = getExpiredDate(client.dateInsured, selectedMode.value)

		const _client = {
			...client,
			mode: selectedMode ? selectedMode.value : '',
			promo: selectedPromo.id,
			dateInsured: new Date(client.dateInsured).toISOString(),
			expiredDate: new Date(expiredDate).toISOString(),
			userInsured: auth.getCurrentUser().id
		}

		try {
			await onAddClient(_client)
			toast.success('Saved')
			setClient({
				firstname: '',
				lastname: '',
				middlename: '',
				address: '',
				contact: '',
				dateInsured: '',
				birthdate: '',
				codeNo: '',
				userInsured: '',
				promo: '',
				gender: '',
				mode: '',
				expiredDate: '',
				civil: '',
				forApproval: true
			})
			setSelectedGender(null)
			setSelectedMode(null)
			setSelectedCivil(null)
			setSelectedPromo(null)
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
					<h5 className='text-secondary'>Add New Future Savings Plan</h5>
				</span>
				{/* <a data-tip='Fill up all the necessary informations. Uncheck the checkbox if there is a given policy number.'>
					<Help />
				</a> */}
				<ReactTooltip type='info' effect='float' />
			</div>
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
					renderButton,
					renderCheckbox
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

								{!client.forApproval && (
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
								)}

								{!client.forApproval && renderInput('codeNo', 'Policy No')}

								{renderCheckbox('forApproval', 'For Approval', {
									onChange: e =>
										setClient({
											...client,
											codeNo: '',
											forApproval: e.target.checked
										})
								})}

								{renderButton('Save', null, 'Saving...', true)}
							</div>
						</div>
					)
				}}
			</Form>
		</React.Fragment>
	)
}

export default AddClient
