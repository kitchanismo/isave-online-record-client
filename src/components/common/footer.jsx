import React, { Component } from 'react'

const Footer = () => {
  return (
    <div className="col-12 pt-3 mb-3 footer d-flex justify-content-center">
      <p className="text-secondary">Copyright 2019</p>

      <style jsx="">{`
        .footer {
          border-top: 1px solid #ddd;
          background-color: #eee;
          border-radius: 0 0 7px 7px;
          height: 60px !important;
        }
      `}</style>
    </div>
  )
}

export default Footer
