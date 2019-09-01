import React, { Component } from 'react'

const Logo = () => {
  return (
    <React.Fragment>
      <div className="logo" />

      <style jsx="">{`
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 5px 0 0 5px;
          background-color: #343a40;
        }
      `}</style>
    </React.Fragment>
  )
}

export default Logo
