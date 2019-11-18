import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { formatDate, cap, getExpiredDate } from './../../services/utilsService'

const CustomModal = ({
  label,
  primary,
  secondary,
  modal,
  toggle,
  className,
  title,
  ...rest
}) => {
  const [codeNo, setCodeNo] = useState('')
  const [dateInsured, setDateInsured] = useState('')
  const [expiredDate, setExpiredDate] = useState('')

  const errorMessage = () => {
    if (!codeNo) return '"Policy Number" is not allowed to be empty'

    if (codeNo && !codeNo.match(/^[a-zA-Z0-9-]+$/))
      return '"Policy Number" must only have a number and letter with hyphen'
    if (codeNo && codeNo.length !== 15)
      return '"Policy Number" must be equal to 15 characters long'
    return null
  }

  const errorMessageDateInsured = () => {
    if (!dateInsured) return '"Date Insured" is not allowed to be empty'

    return null
  }

  const handleDateInsured = date => {
    const expiredDate = getExpiredDate(
      date,
      rest.client ? rest.client.mode : ''
    )

    setDateInsured(formatDate(date))
    setExpiredDate(expiredDate)
  }

  return (
    <Modal isOpen={modal} toggle={toggle} className={`${className}`} {...rest}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>

      <ModalBody>
        <div className="form-group">
          <label htmlFor="name">Fullname: &nbsp;</label>
          <p className="text-secondary">
            {rest.client
              ? cap(
                  `${rest.client.lastname}, ${rest.client.firstname} ${rest.client.middlename}`
                )
              : ''}
          </p>
          <label htmlFor="mode">Mode of Payment: &nbsp;</label>
          <p className="text-secondary">
            {rest.client ? cap(rest.client.mode) : ''}
          </p>
          <div className="row m-0 p-0">
            <div className="col-6 m-0 py-0 pl-0 pr-2">
              <label htmlFor="dateInsured">Date Insured</label>
              <div>
                <DatePicker
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="Select a date"
                  className="form-control"
                  onChange={handleDateInsured}
                  value={dateInsured}
                  onBlur={() => {}}
                />
              </div>
              <p className="error-message text-danger p-1">
                {errorMessageDateInsured()}
              </p>
            </div>
            <div className="col-6 m-0 py-0 pr-0 pl-2">
              <label htmlFor="expiredDate">Expire Date</label>
              <div className="input-group mb-2">
                <input
                  disabled
                  name="expiredDate"
                  id="expiredDate"
                  value={expiredDate}
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <label htmlFor="codeNo">Enter Policy Number</label>
          <div className="input-group mb-2">
            <input
              name="codeNo"
              id="codeNo"
              value={codeNo}
              onChange={e => setCodeNo(e.target.value)}
              className="form-control"
            />
          </div>

          <p className="error-message text-danger p-1">{errorMessage()}</p>

          <style jsx="">{`
            .error-message {
              font-size: 13px;
            }
          `}</style>
        </div>
      </ModalBody>

      <ModalFooter>
        <button
          className={`btn btn-${(primary && primary.type) || 'primary'} btn-sm`}
          name="primary"
          onClick={e => {
            if (errorMessage() || errorMessageDateInsured()) return
            toggle(e, {
              codeNo,
              dateInsured: new Date(dateInsured).toISOString(),
              expiredDate: new Date(expiredDate).toISOString()
            })
            setCodeNo(null)
            setDateInsured('')
            setExpiredDate('')
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
            setCodeNo(null)
            setDateInsured('')
            setExpiredDate('')
          }}
        >
          {(secondary && secondary.label) || 'Cancel'}
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default CustomModal
