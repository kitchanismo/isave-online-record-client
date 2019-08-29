import React, { useState, memo } from 'react'
import SideMenu from './partials/sideMenu'
import Dashboard from './dashboard'
import Branch from './branch'
import Agent from './agent'
import Users from './users'
import Reports from './reports'
import Footer from './partials/footer'

const Home = () => {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <SideMenu>
            {({ menu }) => {
              if (menu.dashboard) return <Dashboard />
              if (menu.branch) return <Branch />
              if (menu.agent) return <Agent />
              if (menu.users) return <Users />
              if (menu.reports) return <Reports />
            }}
          </SideMenu>
          <Footer></Footer>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home
