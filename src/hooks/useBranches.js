import React, { useState, useEffect } from 'react'

import { getBranches } from '../services/userService'

export default () => {
  const [branches, setBranches] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(false)
    getBranches('/api/branches', true).then(branches => {
      setIsLoaded(true)
      setBranches(branches)
    })
  }, [refresh])
  return { branches, setRefresh, setBranches, isLoaded }
}
