import React from 'react'
import withAuth from '../hoc/withAuth'
import { NavLink } from 'react-router-dom'

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
                Dashboard
              </NavLink>
            </li>
            <hr></hr>
            <li className="nav-item">
              <NavLink
                name="branch"
                to="/branches"
                className={`nav-link text-white `}
              >
                Branch
              </NavLink>
            </li>
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
                Reports
              </NavLink>
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
