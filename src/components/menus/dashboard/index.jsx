import React from 'react'

import Charts from './charts'

const Dashboard = props => {
  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
      </div>
      <div className="row">
        <div className="col-12 mt-3">
          <Charts></Charts>
        </div>
      </div>

      <style jsx="">{`
        .fa-plus {
          margin-top: 0 !important;
        }
      `}</style>
    </React.Fragment>
  )
}

export default Dashboard
