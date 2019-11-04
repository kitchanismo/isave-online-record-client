import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { cap, formatDate } from '../../services/utilsService'
import auth from '../../services/authService'
const CustomModal = ({
  client,
  label,
  primary,
  secondary,
  modal,
  toggle,
  className,
  title,
  ...rest
}) => {
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

  const [mode, setMode] = useState(null)

  const getExpiredDate = (date, mode) => {
    const dateInsured = new Date(date)

    const expiredDate = new Date(dateInsured)

    expiredDate.setMonth(dateInsured.getMonth() + getAddedMonth(mode))

    return formatDate(expiredDate)
  }

  const handleOnChange = mode => {
    setMode(mode)
  }

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

  const dateInsured = new Date(Date.now()).toISOString()

  const _client = () => {
    return {
      ...client,
      dateInsured,
      expiredDate: getExpiredDate(client.dateInsured, mode ? mode.value : ''),
      mode: mode ? mode.value : '',
      userInsured: auth.getCurrentUser().id
    }
  }

  return (
    <Modal isOpen={modal} toggle={toggle} className={`${className}`} {...rest}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>

      <ModalBody>
        <p>Policy #: {client.codeNo}</p>
        <p>Name: {`${client.firstname} ${client.lastname}`}</p>
        <p>Date Insured: {formatDate(dateInsured)}</p>
        <div className="form-group">
          <label htmlFor="mode">Mode of Payment</label>
          <Select
            isSearchable
            isClearable
            value={mode}
            onChange={handleOnChange}
            options={modes}
          />
          {!mode && (
            <p className="error-message text-danger p-1">{`"Mode of Payment is not allowed to be empty"`}</p>
          )}
        </div>
      </ModalBody>

      <ModalFooter>
        <button
          className={`btn btn-${(primary && primary.type) || 'primary'} btn-sm`}
          name="primary"
          onClick={e => {
            if (!mode) return
            toggle(e, _client())
            setMode(null)
          }}
        >
          {(primary && primary.label) || 'Ok'}
        </button>
        <button
          className={`btn btn-${(secondary && secondary.type) ||
            'secondary'} btn-sm`}
          name="secondary"
          onClick={e => {
            toggle(e)
            setMode(null)
          }}
        >
          {(secondary && secondary.label) || 'Cancel'}
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default CustomModal
