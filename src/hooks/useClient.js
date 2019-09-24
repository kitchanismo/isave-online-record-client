import React, { useState, useEffect } from 'react'
import { getClients } from './../services/clientService'

export default name => {
  const [clients, setClients] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    getClients(name).then(clients => setClients(clients))
  }, [name, refresh])
  return { clients, setRefresh, setClients }
}
