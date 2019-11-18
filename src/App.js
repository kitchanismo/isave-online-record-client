import React from 'react'
import { ToastContainer } from 'react-toastify'
import Nav from './components/common/nav'

import Routes from './routes'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

const App = props => {
  return (
    <React.Fragment>
      <Nav></Nav>

      <React.Fragment>
        <ToastContainer autoClose={5000} />

        <Routes />
      </React.Fragment>
    </React.Fragment>
  )
}

export default App
