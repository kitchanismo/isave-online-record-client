import React, { useState, memo } from 'react'
import SideMenu from './partials/sideMenu'
import Dashboard from './dashboard'

const Home = () => {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <SideMenu></SideMenu>
          <Dashboard></Dashboard>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home
