import React from 'react'
import { NavLink } from 'react-router-dom'
import auth from '../../services/authService'
import { cap } from '../../services/utilsService'
import { theme } from '../../config.json'

const Nav = props => {
  const handleLogout = () => {
    auth.logout()
  }

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <h6 className="text-white mt-1">
            <span style={{ color: theme.secondary }}>COCOLIFE </span>: Hybrid
            Management Information System with SMS Notification
          </h6>

          <div
            className="collapse navbar-collapse d-flex justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {auth.isValidUser() && (
                <React.Fragment>
                  <li className="nav-item ml-1">
                    <NavLink
                      className="nav-link active"
                      to={`/users/${auth.getCurrentUser().id}`}
                    >
                      {cap(auth.getCurrentUser().username) +
                        ' | ' +
                        cap(auth.getCurrentUser().position)}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a
                      href="/login"
                      className="nav-link"
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
