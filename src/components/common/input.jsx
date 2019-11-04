import React from 'react'

const Input = ({ name, label, error, icon = '', ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="input-group mb-2">
        <div className="input-group-prepend">
          {icon && (
            <div className="input-group-text p-0">
              <span className={`fa ${icon} p-0 m-2`}></span>
            </div>
          )}
        </div>
        <input {...rest} name={name} id={name} className="form-control" />
      </div>
      {/* {error && <div className="alert p-2 mt-2 alert-danger">{error}</div>} */}
      {error && <p className="error-message text-danger p-1">{error}</p>}
      <style jsx="">{`
        .error-message {
          font-size: 13px;
        }
      `}</style>
    </div>
  )
}

export default Input
