import http from './httpService'
import auth from './authService'
import { mapToSelect, cap } from './utilsService'

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

export async function getPromos() {
  http.sendJwt(auth.jwt())
  return await http
    .get('/api/users/promo-officers')
    .then(data => data.data)
    .then(({ users }) => {
      return users.map(user => {
        const { firstname, lastname, middlename } = user.profile
        return {
          id: user.id,
          label: cap(`${firstname} ${middlename} ${lastname}`),
          value: `${firstname} ${middlename} ${lastname}`
        }
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

export function getBranch(id) {
  return http.get('/api/branches/show/' + id).then(data => data.data)
}

export function updateBranch(id, branch) {
  return http.put('/api/branches/edit/' + id, branch).then(data => data.data)
}

export async function addManager(user) {
  http.sendJwt(auth.jwt())
  return await http.post('/api/users', user).then(data => data.data)
}

export async function editUser(id, user) {
  http.sendJwt(auth.jwt())
  return await http.put('/api/users/' + id, user).then(data => data.data)
}

export async function getManager(branchId) {
  // http.setJwt(auth.jwt())
  return await http
    .get(`/api/branches/managers/${branchId}`)
    .then(data => data.data.fullname)
}

export function getPagedUsers(num, limit, search = '', status) {
  http.sendJwt(auth.jwt())
  return http
    .get(
      `/api/users/page/${num}?limit=${limit}&status=${status}&search=${search}`
    )
    .then(data => data.data.data)
}

export function verifyUser(id) {
  http.sendJwt(auth.jwt())
  return http.get(`/api/users/status/${id}`).then(data => data.data.data)
}

export function archivedUser() {
  http.sendJwt(auth.jwt())
  return http.get(`/api/users/archived`).then(data => data.data.archived)
}

export function statusCount() {
  http.sendJwt(auth.jwt())
  return http.get(`/api/users/status-count`).then(data => data.data.data)
}

export function getUser(id) {
  http.sendJwt(auth.jwt())
  return http.get(`/api/users/${id}`).then(data => data.data.user)
}

export function getMe() {
  http.sendJwt(auth.jwt())
  return http.get(`/api/users/me`).then(data => data.data.user)
}

export function getUnverifyUser() {
  http.sendJwt(auth.jwt())
  return http.get(`/api/users/unverify`).then(data => data.data.unverify)
}

export function deleteUser(id) {
  http.sendJwt(auth.jwt())
  return http.delete(`/api/users/${id}`).then(data => data.data)
}

export function restoreUser(id) {
  http.sendJwt(auth.jwt())
  return http.get(`/api/users/restore/${id}`).then(data => data.data)
}

export function getLogs(search) {
  http.sendJwt(auth.jwt())
  return http.post(`/api/user-logs`, { search }).then(data => data.data.logs)
}
