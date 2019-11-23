import React, {useState, useContext} from 'react'
import Form from '../../common/form'
import Joi from 'joi-browser'
import {toast} from 'react-toastify'
import {
	formatDate,
	joiLettersOnly,
	joiMobileNumber,
	calculateAge
} from '../../../services/utilsService'
import auth from '../../../services/authService'

import {ClientContext} from '../../../context'
import Help from './../../common/help'
import ReactTooltip from 'react-tooltip'
import {useMedia} from 'react-use'

const AddGPA = props => {
	const {onAddClient} = useContext(ClientContext)

	const isMobile = useMedia('(max-width: 600px)')

	const [client, setClient] = useState({
		firstname: '',
		lastname: '',
		middlename: '',
		birthdate: '',
		dateInsured: formatDate(Date.now()),
		address: '',
		contact: '',
		codeNo: '',
		gender: '',
		coverage: 0,
		civil: ''
	})

	const [selectedCivil, setSelectedCivil] = useState(null)

	const [selectedCoverage, setSelectedCoverage] = useState(null)
	const [selectedGender, setSelectedGender] = useState(null)
	const [errors, setErrors] = useState({})

	const schema = {
		firstname: joiLettersOnly('Firstname'),
		middlename: joiLettersOnly('Middlename'),
		lastname: joiLettersOnly('Lastname'),
		dateInsured: Joi.string()
			.required()
			.label('Date Insured'),
		birthdate: Joi.string()
			.required()
			.label('Birthdate'),
		gender: Joi.string()
			.required()
			.label('Gender'),
		coverage: Joi.number()
			.required()
			.label('Coverage'),
		contact: joiMobileNumber('Mobile Number'),
		address: Joi.optional(),
		codeNo: Joi.number()
			.required()
			.label('Code Number'),
		civil: Joi.string()
			.required()
			.label('Civil Status')
	}

	const handleChangeCoverage = coverage => setSelectedCoverage(coverage)
	const handleChangeCivil = civil => setSelectedCivil(civil)
	const handleChangeGender = gender => setSelectedGender(gender)

	const handleDateInsured = date => {
		setClient({
			...client,
			dateInsured: formatDate(date)
		})
	}

	const handleSubmit = async (e, client) => {
		try {
			const age = calculateAge(client.birthdate)

			if (age < 7 || age > 60) {
				setErrors({birthdate: '"Age" must be 7 to 60 years old!'})
				return
			}
			await onAddClient({
				...client,
				isGPA: true,
				dateInsured: new Date(client.dateInsured).toISOString(),
				userInsured: auth.getCurrentUser().id
			})

			toast.success('Saved')

			setClient({
				firstname: '',
				lastname: '',
				middlename: '',
				address: '',
				contact: '',
				dateInsured: '',
				codeNo: '',
				gender: '',
				birthdate: '',
				coverage: 0,
				civil: ''
			})
			setSelectedGender(null)
			setSelectedCoverage(null)
			setSelectedCivil(null)
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
					<h5 className='text-secondary'>Add New Group Personal Accident</h5>
				</span>

				<ReactTooltip type='info' effect='float' />
			</div>

			<Form
				data={{data: client, setData: setClient}}
				errors={{errors, setErrors}}
				onSubmit={handleSubmit}
				schema={schema}
			>
				{({renderInput, renderSelect, renderTextArea, renderDatePicker}) => {
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
								{renderInput('contact', 'Contact')}
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
								<button className='btn btn-grad-primary btn-block' name='back'>
									Save
								</button>
							</div>
						</div>
					)
				}}
			</Form>
		</React.Fragment>
	)
}

export default AddGPA
