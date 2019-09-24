import React from 'react'
import { NavLink } from 'react-router-dom'
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
          <h6 className="text-white mt-1">
            <span style={{ color: theme.secondary }}>COCOLIFE </span>: Hybrid
            Management Information System with SMS Notification
          </h6>
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
                  <li className="nav-item ml-1">
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
          </div>
        </div>
        <style jsx="">{`
          .navbar {
            margin-bottom: 20px;
          }
          .fa {
            margin-top: 12px !important;
          }

          i {
            cursor: pointer;
          }
        `}</style>
      </nav>
    </React.Fragment>
  )
}

export default Nav
