import React from 'react'

import Charts from './charts'
import withAuth from '../../hoc/withAuth'
import { cap } from './../../../services/utilsService'

const Dashboard = ({ auth, ...props }) => {
  const { position } = auth.getCurrentUser()

  const isSales = position === 'sales'
  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
        {!isSales && auth.getCurrentUser().position !== 'admin' && (
          <div>
            <button
              onClick={() => props.history.replace('/dashboard/new-fs')}
              className="btn btn-sm btn-grad-secondary"
            >
              <span className="fa fa-plus mr-1"></span>
              FUTURE SAVINGS
            </button>
            <button
              onClick={() => props.history.replace('/dashboard/new-gpa')}
              className="btn btn-sm btn-grad-secondary  ml-2"
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
        .fa-plus {
          margin-top: 0 !important;
        }
      `}</style>
    </React.Fragment>
  )
}

export default withAuth(Dashboard)
