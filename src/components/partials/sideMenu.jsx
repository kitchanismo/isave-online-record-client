import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
const SideMenu = () => {
  return (
    <nav className="col-md-2 d-none d-md-block bg-dark">
      <div className="sidebar-sticky">
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <NavLink className="nav-link active" to="/">
              <span data-feather="home"></span>
              Dashboard <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <hr></hr>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/">
              Branch
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white " to="/">
              Agent
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/">
              Users
            </NavLink>
          </li>
          <hr></hr>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/">
              Reports
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default SideMenu
