import React, { useState, useEffect } from 'react'
import { getClients } from '../services/clientService'
import { archivedUser } from '../services/userService'

export default (name, search, gender) => {
  const [reports, setReports] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setReports([])
    setIsLoaded(false)

    if (name === 'user-archived') {
      archivedUser().then(reports => {
        setReports(reports)

        setIsLoaded(true)
      })
    } else {
      getClients(name, search, gender).then(reports => {
        setReports(reports)
        setIsLoaded(true)
      })
    }
  }, [name, refresh])
  return { reports, setRefresh, setReports, isLoaded }
}
