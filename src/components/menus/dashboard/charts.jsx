import React, { useState, useContext } from 'react'
import Chart from 'react-apexcharts'
import { UserContext } from './../../../context'

const Charts = ({ dimension = 400 }) => {
  const {
    state: {}
  } = useContext(UserContext)

  const [optionsSales, setOptionsSales] = useState({
    theme: {
      palette: 'palette6'
    },
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: [2011, 2012, 2014, 2015, 2016, 2017, 2018, 2019]
    },
    title: {
      text: 'Total Sales',
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '20px',
        color: '#263238'
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

  const [optionsGPA, setOptionsGPA] = useState({
    theme: {
      palette: 'palette6'
    },
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: [2011, 2012, 2014, 2015, 2016, 2017, 2018, 2019]
    },
    title: {
      text: 'Total GPA',
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '20px',
        color: '#263238'
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

  const [optionsFSF, setOptionsFSF] = useState({
    theme: {
      palette: 'palette6'
    },
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: [2011, 2012, 2014, 2015, 2016, 2017, 2018, 2019]
    },
    title: {
      text: 'Total FSF',
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '20px',
        color: '#263238'
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

  const [optionsUser, setOptionsUser] = useState({
    theme: {
      palette: 'palette6'
    },
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: [2011, 2012, 2014, 2015, 2016, 2017, 2018, 2019]
    },
    title: {
      text: 'User Info',
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '20px',
        color: '#263238'
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

  const [series, setSeries] = useState([
    {
      name: 'series-1',
      data: [30, 40, 45, 50, 49]
    }
  ])

  const chart = () => (
    <React.Fragment>
      <div className="row d-flex justify-content-around">
        <Chart
          type="line"
          options={optionsSales}
          series={series}
          width="400px"
        />
        <Chart
          type="line"
          options={optionsUser}
          series={series}
          width="400px"
        />
      </div>
      <div className="row d-flex justify-content-around">
        <Chart type="line" options={optionsGPA} series={series} width="400px" />
        <Chart type="line" options={optionsFSF} series={series} width="400px" />
      </div>
    </React.Fragment>
  )

  return <div>{chart(optionsGPA)}</div>
}

export default Charts
