import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import auth from '../../services/authService'
import { cap } from '../../services/utilsService'

import { theme } from '../../config.json'

const Nav = props => {
  const handleLogout = async () => {
    await auth.logout()
  }

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <h5 className="text-white mt-1">
            <span style={{ color: theme.secondary }}>_i</span>
            SAVE_: Online Record Management System
          </h5>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse d-flex justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {auth.isValidUser() && (
                <React.Fragment>
                  <i className="fa fa-key text-success mr-3"></i>
                  <i className="fa fa-exclamation-triangle text-danger mr-3"></i>
                  <i className="fa fa-user text-warning" />
                  <li className="nav-item">
                    <NavLink className="nav-link active" to="/home">
                      {cap(auth.getCurrentUser().username) +
                        ' | ' +
                        cap(auth.getCurrentUser().position)}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="/login"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li>
                </React.Fragment>
              )}
            </ul>
            <div className="dropdown-menu">
              <h6 className="dropdown-header">Dropdown header</h6>
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </div>
          </div>
        </div>
        <style jsx="">{`
          .navbar {
            margin-bottom: 20px;
          }
          .fa {
            margin-top: 12px !important;
          }
        `}</style>
      </nav>
    </React.Fragment>
  )
}

export default Nav
