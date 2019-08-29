import http from './httpService'
import { mapToSelect } from './utilsService'

export async function getPositions() {
  return await http
    .get('/api/positions')
    .then(data => data.data)
    .then(({ positions }) => {
      return positions.map(position => {
        return mapToSelect(position)
      })
    })
}

export async function getBranches() {
  return await http
    .get('/api/branches')
    .then(data => data.data)
    .then(({ branches }) => {
      return branches.map(branch => {
        return mapToSelect(branch)
      })
    })
}

export async function getManagers(branchId) {
  return await http
    .get('/api/users/managers?branch_id=' + branchId)
    .then(data => data.data)
    .then(({ managers }) => {
      return managers.map(m => {
        return mapToSelect({ id: m.id, name: m.username })
      })
    })
}
