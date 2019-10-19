import React, { useState } from 'react'

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

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

  const errorMessage = () => {
    if (!codeNo) return '"Policy Number" is not allowed to be empty'

    if (codeNo && !codeNo.match(/^[a-zA-Z0-9-]+$/))
      return '"Policy Number" must only have a number and letter with hyphen'
    if (codeNo && codeNo.length !== 15)
      return '"Policy Number" must be equal to 15 characters long'
    return null
  }

  return (
    <Modal isOpen={modal} toggle={toggle} className={`${className}`} {...rest}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>

      <ModalBody>
        <div className="form-group">
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
            if (errorMessage()) return
            toggle(e, codeNo)
            setCodeNo(null)
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
          }}
        >
          {(secondary && secondary.label) || 'Cancel'}
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default CustomModal
