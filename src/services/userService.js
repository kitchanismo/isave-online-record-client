import http from './httpService'
import auth from './authService'
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

export async function getBranches(url, isMap = false) {
  return await http
    .get(url)
    .then(data => data.data)
    .then(({ branches }) => {
      return isMap
        ? branches
        : branches.map(branch => {
            return mapToSelect(branch)
          })
    })
}

export function isBranchTaken(name) {
  return http.get('/api/branches/is-taken?name=' + name).then(data => data.data)
}

export function addBranch(branch) {
  return http.post('/api/branches', branch).then(data => data.data)
}

export async function getManager(branchId) {
  // http.setJwt(auth.jwt())
  return await http
    .get(`/api/branches/managers/${branchId}`)
    .then(data => data.data.fullname)
}

export function getPagedUsers(num, limit, search = '') {
  http.setJwt(auth.jwt())
  return http
    .get(`/api/users/page/${num}?limit=${limit}&search=${search}`)
    .then(data => data.data.data)
}

export function verifyUser(id) {
  http.setJwt(auth.jwt())
  return http.get(`/api/users/verify/${id}`).then(data => data.data.data)
}

export function statusCount() {
  http.setJwt(auth.jwt())
  return http.get(`/api/users/status-count`).then(data => data.data.data)
}

export function getUser(id) {
  http.setJwt(auth.jwt())
  return http.get(`/api/users/${id}`).then(data => data.data.user)
}

export function deleteUser(id) {
  http.setJwt(auth.jwt())
  return http.delete(`/api/users/${id}`).then(data => data.data)
}
