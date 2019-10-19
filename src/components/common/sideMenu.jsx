import React, { useState, useContext } from 'react'
import withAuth from '../hoc/withAuth'
import { NavLink, Link } from 'react-router-dom'
import { theme } from '../../config.json'
import { UserContext, ClientContext } from './../../context'

const SideMenu = ({ auth, ...props }) => {
  const [toggle, setToggle] = useState(false)

  const {
    state: { unverify },
    onSetStatus
  } = useContext(UserContext)

  const {
    status: { total, forApproval, lapsed, nearExpiration, due }
  } = useContext(ClientContext)

  const reportMenu = (name, label, value) => {
    return (
      <Link
        //onClick={() => setToggle(false)}
        className="dropdown-item"
        to={`/reports/${name}`}
      >
        {label}
        <span className="badge badge-sm badge-secondary ml-2 mt-0">
          {value ? value : ''}
        </span>
      </Link>
    )
  }

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
                className={`nav-link text-white`}
              >
                {/* <span className="fa fa-node"></span> Branch */}
                Branch
              </NavLink>
            </li>
          )}

          {auth.isAdminOrManager() && (
            <li className="nav-item">
              <div className="row ">
                <div className="d-flex ml-3">
                  <NavLink
                    onClick={() => {
                      setToggle(false)
                      onSetStatus(null)
                    }}
                    to="/users"
                    className={`nav-link text-white pr-1`}
                  >
                    Users
                  </NavLink>
                </div>
                <div className="m-0 p-0">
                  <Link
                    data-toggle="tooltip"
                    title={`You have ${unverify} unverify user/s!`}
                    onClick={() => {
                      setToggle(false)
                      onSetStatus(0)
                    }}
                    to="/users"
                    className={`nav-link text-white pt-0 pl-0`}
                  >
                    <span className="badge badge-sm badge-danger ml-1">
                      {unverify ? unverify : ''}
                    </span>
                  </Link>
                </div>
              </div>
            </li>
          )}

          <li className="nav-item">
            <div className="row">
              <div className="d-flex ml-3">
                <NavLink
                  to="/reports/for-approval"
                  onClick={() => setToggle(!toggle)}
                  className="nav-link text-white pr-1"
                >
                  Reports
                  <span
                    className={`fa fa-angle-${!toggle ? 'down' : 'up'} ml-1`}
                  ></span>
                </NavLink>
              </div>
              <div className="m-0 p-0">
                <a
                  data-toggle="tooltip"
                  title={`You have ${total} client reports!`}
                  className={`nav-link text-white pt-1 pl-0`}
                >
                  <span className="badge badge-sm badge-danger ml-1">
                    {total ? total : ''}
                  </span>
                </a>
              </div>
            </div>

            {toggle && (
              <div className="dropdown">
                {reportMenu('for-approval', 'For Approval', forApproval)}
                {reportMenu(
                  'near-expiration',
                  'Near Expiration',
                  nearExpiration
                )}

                {reportMenu('lapsed', 'Lapsed Policy', lapsed)}
                <hr className="mx-2" />
                {reportMenu('enforced', 'Enforced Client')}
                {reportMenu('gpa', 'GPA')}
                {reportMenu('cancelled', 'Cancelled Policy')}
                <hr className="mx-2" />

                {reportMenu('user-archived', 'User Archived')}
              </div>
            )}
          </li>
        </ul>

        <style jsx="">{`
          .badge-danger {
            margin-top: -5px;
          }
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
            border-radius: 5px 0 0 0;
          }
          .dropdown {
            margin-left: 30px;
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
          .dropdown-item:hover {
            color: gray !important;
          }
        `}</style>
      </nav>
      {props.children}
    </React.Fragment>
  )
}

export default withAuth(SideMenu)
