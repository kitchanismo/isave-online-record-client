import React, {useState} from 'react'
import Joi from 'joi-browser'
import Input from './input'
import DatePicker from 'react-datepicker'
import Select from 'react-select'

import 'react-datepicker/dist/react-datepicker.css'

const Form = props => {
	const [isDisable, setIsDisable] = useState(false)

	const {data, setData} = props.data || {}
	const {errors, setErrors} = props.errors || {}
	const schema = {...props.schema}

	const validate = () => {
		const options = {abortEarly: false}
		const {error} = Joi.validate(data, schema, options)

		if (!error) return null

		const errors = {}
		for (let item of error.details) errors[item.path[0]] = item.message
		return errors
	}

	const validateProperty = ({name, value}) => {
		const obj = {[name]: value}

		const _schema = {[name]: schema[name]}

		const {error} = Joi.validate(obj, _schema)

		return error ? error.details[0].message : null
	}

	const handleSubmit = (e, doSubmit) => {
		e.preventDefault()

		const errors = validate()
		setErrors(errors || {})

		//console.log(errors)
		if (errors) return

		setIsDisable(true)
		doSubmit(e, data)
			.then(() => setIsDisable(false))
			.catch(() => setIsDisable(true))
	}

	const handleChange = ({currentTarget: input}) => {
		const _errors = {...errors}
		const errorMessage = validateProperty(input)

		if (errorMessage) _errors[input.name] = errorMessage
		else delete _errors[input.name]

		const newErrors = checkConfirmPassword(input, _errors, data.password)

		const _data = {...data}
		_data[input.name] = input.value

		setData(_data)
		setErrors(newErrors)
	}

	const checkConfirmPassword = (input, errors, password) => {
		const newErrors = {...errors}
		if (input.name === 'confirmPassword') {
			if (input.value === password) {
				delete newErrors[input.name]
			}
		}
		return newErrors
	}

	const renderInput = (name, label, type = 'text', icon, rest) => {
		return (
			<Input
				type={type}
				name={name}
				value={data[name]}
				label={label}
				onChange={handleChange}
				error={errors[name]}
				icon={icon}
				{...rest}
			/>
		)
	}

	const renderCheckbox = (name, label, rest) => {
		return (
			<div className='form-check'>
				<input
					type='checkbox'
					checked={data[name]}
					name={name}
					className='form-check-input'
					id={name}
					{...rest}
				/>
				<label className='form-check-label' htmlFor={name}>
					{label}
				</label>
			</div>
		)
	}

	const renderSelect = (name, label, value, onChange, options, rest) => {
		return (
			<div className='form-group'>
				<label htmlFor={name}>{label}</label>
				<Select
					{...rest}
					isSearchable
					isClearable
					value={value}
					onBlur={() => {
						const _errors = {...errors}
						delete _errors[name]
						setErrors(_errors)
					}}
					onChange={selectData => {
						setData({
							...data,
							[name]: selectData ? selectData.value : ''
						})

						onChange(selectData)
					}}
					options={options}
				/>
				{errors[name] && (
					<p className='error-message text-danger p-1'>{errors[name]}</p>
				)}
			</div>
		)
	}

	const isButtonDisable = () =>
		Object.keys(errors).length > 0 || validate() || isDisable

	const renderButton = (
		label,
		icon,
		labelLoading = label,
		isBlock = false,
		className
	) => {
		return (
			<button
				disabled={isButtonDisable()}
				className={`btn btn-grad-primary ${className} mt-3 ${
					isBlock ? 'btn-block' : ''
				}`}
			>
				<span className={`${icon} mr-1`} />
				{isDisable ? labelLoading : label}
			</button>
		)
	}

	const renderDatePicker = (name, label, rest) => {
		return (
			<div className='form-group'>
				<label htmlFor={name}>{label}</label>
				<div>
					<DatePicker
						peekNextMonth
						showMonthDropdown
						showYearDropdown
						dropdownMode='select'
						placeholderText='Select a date'
						className='form-control'
						value={data[name]}
						onBlur={() => {
							const _errors = {...errors}
							delete _errors[name]
							setErrors(_errors)
						}}
						{...rest}
					/>
				</div>
				{errors[name] && (
					<p className='error-message text-danger p-1'>{errors[name]}</p>
				)}
			</div>
		)
	}

	const renderTextArea = (name, label, row = 3) => {
		return (
			<div className='form-group'>
				<label htmlFor={name}>{label}</label>
				<textarea
					value={data[name]}
					onChange={handleChange}
					className='form-control'
					id={name}
					rows={row}
					name={name}
				/>
				{errors[name] && (
					<div className='alert p-2 mt-2 alert-danger'>{errors[name]}</div>
				)}
			</div>
		)
	}
	return (
		<form onSubmit={e => handleSubmit(e, props.onSubmit)}>
			{props.children({
				renderButton,
				renderInput,
				renderTextArea,
				renderDatePicker,
				renderSelect,
				renderCheckbox
			})}
		</form>
	)
}

export default Form
