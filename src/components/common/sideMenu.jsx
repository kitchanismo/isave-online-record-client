import React, { useState } from 'react'
import withAuth from '../hoc/withAuth'
import { NavLink } from 'react-router-dom'
import { theme } from '../../config.json'

const SideMenu = ({ auth, ...props }) => {
  const [toggle, setToggle] = useState(false)

  return (
    <React.Fragment>
      <nav className="side-menu col-md-2 d-none d-md-block bg-dark mr-0 pt-3">
        <ul className="nav flex-column mb-2 mt-2 pr-0">
          <li className="nav-item">
            <NavLink
              onClick={() => setToggle(false)}
              name="dashboard"
              to="/dashboard"
              className={`nav-link text-white `}
            >
              {/* <span className="fa fa-line-chart mr-2"></span> */}
              Dashboard
            </NavLink>
          </li>
          {auth.isAdmin() && (
            <li className="nav-item">
              <NavLink
                onClick={() => setToggle(false)}
                name="branch"
                to="/branches"
                className={`nav-link text-white `}
              >
                {/* <span className="fa fa-node"></span> Branch */}
                Branch
              </NavLink>
            </li>
          )}

          {auth.isAdminOrManager() && (
            <li className="nav-item">
              <NavLink
                onClick={() => setToggle(false)}
                to="/users"
                className={`nav-link text-white `}
              >
                Users
              </NavLink>
            </li>
          )}

          <li className="nav-item">
            <NavLink
              onClick={() => setToggle(!toggle)}
              to="/reports"
              className="nav-link text-white "
            >
              Reports <span className="fa fa-angle-down ml-1"></span>
            </NavLink>
            {toggle && (
              <div className="dropdown">
                <a className="dropdown-item" href="#">
                  Cancelled Policy
                </a>
                <a className="dropdown-item" href="#">
                  GPA
                </a>
                <a className="dropdown-item" href="#">
                  Enforced Client
                </a>
                <a className="dropdown-item" href="#">
                  For Approval
                </a>
                <a className="dropdown-item" href="#">
                  Lapsed Policy
                </a>
                <a className="dropdown-item" href="#">
                  Nearing Expiration
                </a>
              </div>
            )}
          </li>
        </ul>

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
          .dropdown {
            padding-right: 0 !important;
            background-color: white;
            z-index: 2 !important;
            border-radius: 3px !important;
            padding-top: 10px;
            padding-bottom: 10px;
            border: 1px solid #343a40;
          }
          .dropdown-item {
            font-size: 14px;
          }
        `}</style>
      </nav>
      {props.children}
    </React.Fragment>
  )
}

export default withAuth(SideMenu)
