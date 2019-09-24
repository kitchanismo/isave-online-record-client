import React, { Component } from 'react'

const Footer = () => {
  return (
    <div className="col-12 pt-3 mb-3 footer d-flex justify-content-center">
      <p className="text-white">Copyright 2019</p>
      <style jsx="">{`
        .footer {
          background-color: #343a40;
          border-radius: 0 0 7px 7px;
          height: 60px !important;
        }
      `}</style>
    </div>
  )
}

export default Footer
