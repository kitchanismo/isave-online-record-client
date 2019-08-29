import React, { Component } from 'react'

const Logo = () => {
  return (
    <React.Fragment>
      <div className="offset-2 col-4">
        <div className="logo mt-2 border border-warning" />
      </div>
      <style jsx="">{`
        .logo {
          width: 90%;
          height: 100%;
          border-radius: 7px;
        }
      `}</style>
    </React.Fragment>
  )
}

export default Logo
