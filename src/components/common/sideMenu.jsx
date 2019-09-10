import React from 'react'
import withAuth from '../hoc/withAuth'
import { NavLink } from 'react-router-dom'
import { theme } from '../../config.json'

const SideMenu = ({ auth, ...props }) => {
  return (
    <React.Fragment>
      <nav className="side-menu col-md-2 d-none d-md-block bg-dark">
        <div className="sidebar-sticky">
          <ul className="nav flex-column mb-2 mt-2">
            <li className="nav-item">
              <NavLink
                name="dashboard"
                to="/dashboard"
                className={`nav-link text-white `}
              >
                {/* <span className="fa fa-line-chart mr-2"></span> */}
                Dashboard
              </NavLink>
            </li>
            <hr></hr>
            {auth.isAdmin() && (
              <li className="nav-item">
                <NavLink
                  name="branch"
                  to="/branches"
                  className={`nav-link text-white `}
                >
                  {/* <span className="fa fa-node"></span> Branch */}
                  Branch
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink
                name="agents"
                to="/agents"
                className={`nav-link text-white `}
              >
                Agent
              </NavLink>
            </li>
            {auth.isAdminOrManager() && (
              <li className="nav-item">
                <NavLink to="/users" className={`nav-link text-white `}>
                  {/* <span className="fa fa-users mr-2"></span> */}
                  Users
                </NavLink>
              </li>
            )}

            <hr></hr>
            <li className="nav-item">
              <NavLink
                name="reports"
                to="/reports"
                className={`nav-link text-white`}
              >
                {/* <span className="fa fa-file-text mr-2"></span> */}
                Reports
              </NavLink>
            </li>
          </ul>
        </div>
        <style jsx="">{`
          .active {
            color: ${theme.secondary} !important;
            cursor: hand;
          }
          .nav-link {
            cursor: pointer;
          }
          a:hover {
            color: #ddd !important;
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
      {props.children}
    </React.Fragment>
  )
}

export default withAuth(SideMenu)
