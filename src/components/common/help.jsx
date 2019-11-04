import React, { Component } from 'react'

const Help = ({ text, className }) => {
  return (
    <React.Fragment>
      <div
        className={`help-wrapper d-flex justify-content-center text-center m-0 p-3 ${className}`}
      >
        <span className="fa fa-question text-info"></span>

        <p style={{ color: '#0c5460' }} className="mb-0">
          {text}
        </p>
      </div>
      <style jsx="">{`
        .help-wrapper {
          margin: 0;
          border-radius: 5px;
          background-color: #d1ecf1;
        }
        .fa-question {
          font-size: 45px;
          margin-top: 0 !important;
          margin-bottom: 0px !important;
          cursor: pointer;
        }
      `}</style>
    </React.Fragment>
  )
}
export default Help
