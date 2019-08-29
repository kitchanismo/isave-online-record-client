import React, { useState } from 'react'
import { Link, a } from 'react-router-dom'
const SideMenu = props => {
  const [menu, setMenu] = useState({
    dashboard: 'active',
    branch: '',
    agent: '',
    users: '',
    reports: ''
  })

  const navigate = menu => {
    setMenu({ [menu]: 'active' })
  }

  return (
    <React.Fragment>
      <nav className="side-menu col-md-2 d-none d-md-block bg-dark">
        <div className="sidebar-sticky">
          <ul className="nav flex-column mb-2 mt-2">
            <li className="nav-item">
              <a
                name="dashboard"
                onClick={() => navigate('dashboard')}
                className={`nav-link text-white ${menu.dashboard}`}
              >
                Dashboard
              </a>
            </li>
            <hr></hr>
            <li className="nav-item">
              <a
                onClick={() => navigate('branch')}
                className={`nav-link text-white ${menu.branch}`}
              >
                Branch
              </a>
            </li>
            <li className="nav-item">
              <a
                onClick={() => navigate('agent')}
                className={`nav-link text-white ${menu.agent}`}
              >
                Agent
              </a>
            </li>
            <li className="nav-item">
              <a
                onClick={() => navigate('users')}
                className={`nav-link text-white ${menu.users}`}
              >
                Users
              </a>
            </li>
            <hr></hr>
            <li className="nav-item">
              <a
                onClick={() => navigate('reports')}
                className={`nav-link text-white ${menu.reports}`}
              >
                Reports
              </a>
            </li>
          </ul>
        </div>
        <style jsx="">{`
          .active {
            color: gold !important;
            cursor: hand;
          }
          .nav-link {
            cursor: pointer;
          }
          a:hover {
            color: gray !important;
          }
          hr {
            margin-top: 3;
            border: 0.5px solid gray;
          }
          .side-menu {
            border-radius: 7px 0 0 0;
          }
        `}</style>
      </nav>
      {props.children({ menu })}
    </React.Fragment>
  )
}

export default SideMenu
