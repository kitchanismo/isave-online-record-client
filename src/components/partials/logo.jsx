import React, { Component } from 'react'

const Logo = () => {
  return (
    <React.Fragment>
      <div className="logo mt-2 border border-secondary" />

      <style jsx="">{`
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 7px;
        }
      `}</style>
    </React.Fragment>
  )
}

export default Logo
