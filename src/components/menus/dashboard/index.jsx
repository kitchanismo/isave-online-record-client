import React from 'react'

import Charts from './charts'
import withAuth from '../../hoc/withAuth'
import { cap } from './../../../services/utilsService'

const Dashboard = ({ auth, ...props }) => {
  const { position } = auth.getCurrentUser()

  const isSales = position === 'sales'
  return (
    <React.Fragment>
      <main
        role="main"
        className="dashboard col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 bg-light border border-secondary"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">Dashboard</h1>
          {!isSales && (
            <div>
              <button
                onClick={() => props.history.replace('/dashboard/new-fs')}
                className="btn btn-sm btn-outline-success"
              >
                <span className="fa fa-plus mr-1"></span>
                FUTURE SAVINGS
              </button>
              <button
                onClick={() => props.history.replace('/dashboard/new-gpa')}
                className="btn btn-sm btn-outline-success ml-2"
              >
                <span className="fa fa-plus mr-1"></span>
                GPA FORM
              </button>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-12 mt-3">
            <Charts></Charts>
          </div>
        </div>

        <style jsx="">{`
          .dashboard {
            border-radius: 0px 7px 0 0;
          }
          .fa-plus {
            margin-top: 0 !important;
          }
        `}</style>
      </main>
    </React.Fragment>
  )
}

export default withAuth(Dashboard)
