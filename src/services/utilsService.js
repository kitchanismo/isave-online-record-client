import _ from 'lodash'
import Joi from 'joi-browser'

export function sortBy(items, sortColumn) {
	return _.orderBy(items, [sortColumn.path], [sortColumn.order])
}

export function toElipse(str, end = 20) {
	const x = str.substring(0, end)
	const hasElipse = str.length > end ? '...' : ''
	return `${x} ${hasElipse}`
}

export const formatDate = date => {
	return date ? new Date(date).toLocaleDateString() : null
}

export const createArray = (start, end) => {
	let arr = []
	for (let i = start; i <= end; i++) {
		arr.push(i)
	}
	return arr
}

export const joiLettersOnly = label => {
	return Joi.string()
		.required()
		.regex(/^[A-Za-z\s]*$/)
		.error(errors => {
			errors.forEach(err => {
				switch (err.type) {
					case 'any.empty':
						err.message = `"${label}" is not allowed to be empty`
						break
					case 'string.regex.base':
						err.message = `"${label}" must NOT have a number or special character`
						break
					default:
						break
				}
			})
			return errors
		})
		.label(label)
}

export const joiMobileNumber = label => {
	return Joi.string()
		.required()
		.regex(/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/)
		.error(errors => {
			errors.forEach(err => {
				switch (err.type) {
					case 'any.empty':
						err.message = `"${label}" is not allowed to be empty`
						break
					case 'string.regex.base':
						err.message = `"${label}" must be a valid mobile number`
						break
					default:
						break
				}
			})
			return errors
		})
		.label(label)
}

export function labelPosition(position) {
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

export const mapToSelect = ({id, name}) => {
	return {id, label: cap(name), value: name}
}

export const calculateAge = date => {
	if (!date) return 0
	const birthdate = new Date(formatDate(date))

	const ageDif = Date.now() - birthdate.getTime()
	const ageDate = new Date(ageDif)
	return Math.abs(ageDate.getUTCFullYear() - 1970)
}

export const cap = str => _.startCase(str)

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

export const getExpiredDate = (date, mode) => {
	const dateInsured = new Date(date)

	const expiredDate = new Date(dateInsured)

	expiredDate.setMonth(dateInsured.getMonth() + getAddedMonth(mode))

	return formatDate(expiredDate)
}
