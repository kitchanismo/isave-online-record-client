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

export const mapToSelect = ({ id, name }) => {
  return { id, label: cap(name), value: name }
}

export const cap = str => _.startCase(str)
