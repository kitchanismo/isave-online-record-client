import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import { theme } from '../../../config.json'
import useReport from '../../../hooks/useReport'
import { formatDate } from '../../../services/utilsService'
import { getStatistics } from '../../../services/clientService'

const useOptions = title => {
  const [series, setSeries] = useState([
    {
      name: 'series-1',
      data: []
    }
  ])
  const [options] = useState({
    theme: {
      palette: 'palette5'
    },
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC'
      ]
    },
    title: {
      text: title,
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '20px',
        color: theme.secondary
      }
    },
    grid: {
      show: true,
      borderColor: 'black',
      strokeDashArray: 1,
      position: 'back',
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      },
      row: {
        colors: undefined,
        opacity: 0.5
      },
      column: {
        colors: undefined,
        opacity: 0.5
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    }
  })

  return { options, series, setSeries }
}

const Charts = props => {
  const { reports = [], isLoaded } = useReport('near-expiration')

  const { options: fspOptions, series: fsp, setSeries: setFSP } = useOptions(
    '2019 FSP Statistic'
  )

  const { options: gpaOptions, series: gpa, setSeries: setGPA } = useOptions(
    '2019 GPA Statistic'
  )

  useEffect(() => {
    getStatistics().then(data => {
      setFSP([{ name: 'series-1', data: data.fsp }])
      setGPA([{ name: 'series-1', data: data.gpa }])
    })
  }, [])

  const chart = () => (
    <React.Fragment>
      <div className="row d-flex justify-content-around mx-2">
        <ul className="list-group">
          <li className="header-list pb-0 list-group-item d-flex justify-content-between align-items-center">
            <span className="font-weight-bold">Client Near Expiration</span>
            <span className="badge badge-danger badge-pill">
              {reports.length ? reports.length : ''}
            </span>
          </li>
          <li className="header-list py-1 list-group-item d-flex justify-content-between align-items-center">
            <span className="font-weight-light">Name</span>
            <span className="font-weight-light">Due Date</span>
          </li>
          <div className="wrapper-list">
            {reports.map(client => (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {`${client.lastname}, ${client.firstname} ${client.middlename}`}

                <span className="badge badge-warning badge-pill">
                  {formatDate(client.expiredDate)}
                </span>
              </li>
            ))}
            {reports.length === 0 && isLoaded && (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                No record/s found!
              </li>
            )}
          </div>
        </ul>

        <ul className="list-group">
          <li className="header-list pb-0 list-group-item d-flex justify-content-between align-items-center">
            <span className="font-weight-bold">SPIF</span>
          </li>
          <li className="header-list py-1 list-group-item d-flex justify-content-between align-items-center">
            <span className="font-weight-light">Tab</span>
            <span className="font-weight-light">Tab</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            No record/s found!
          </li>
        </ul>
      </div>
      <div className="row d-flex justify-content-around">
        <Chart
          key="Sales"
          type="line"
          options={fspOptions}
          series={fsp}
          width="400px"
        />
        <Chart
          key="FSF"
          type="line"
          options={gpaOptions}
          series={gpa}
          width="400px"
        />
      </div>
      <style jsx="">{`
        .list-group {
          width: 400px !important;
        }
        .header-list {
          background-color: ${theme.secondary};
          border-color: ${theme.secondary};
          color: white;
        }

        .wrapper-list {
          margin: 0;
          padding: 0;
          height: 180px;
          overflow-y: auto;
          overflow-x: hidden;
        }
      `}</style>
    </React.Fragment>
  )

  return <div>{chart()}</div>
}

export default Charts
