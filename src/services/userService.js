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

export function getPagedUsers(num, limit, search = '') {
  return http
    .get(`/api/users/page/${num}?limit=${limit}&search=${search}`)
    .then(data => data.data.data)
}

export function verifyUser(id) {
  return http.get(`/api/users/verify/${id}`).then(data => data.data.data)
}

export function statusCount() {
  return http.get(`/api/users/status-count`).then(data => data.data.data)
}

export function getUser(id) {
  return http.get(`/api/users/${id}`).then(data => data.data.user)
}

export function deleteUser(id) {
  console.log(id)
  return http.delete(`/api/users/${id}`).then(data => data.data)
}
