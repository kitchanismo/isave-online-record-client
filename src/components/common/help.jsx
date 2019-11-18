import React, { Component } from 'react'

const Help = () => {
  return (
    <React.Fragment>
      <span className="fa fa-question text-info"></span>

      <style jsx="">{`
        .fa-question {
          font-size: 35px;
          margin-top: 0 !important;
          margin-bottom: 0px !important;
          cursor: pointer;
        }
      `}</style>
    </React.Fragment>
  )
}

export default Help
