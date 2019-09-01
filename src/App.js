import React from 'react'
import { ToastContainer } from 'react-toastify'
import Nav from './components/common/nav'
import Routes from './routes'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <React.Fragment>
      <Nav />
      <ToastContainer autoClose={5000} />
      <div className="container">
        <Routes />
      </div>
    </React.Fragment>
  )
}

export default App
