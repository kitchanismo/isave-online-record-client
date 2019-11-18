import http from './httpService'
import auth from './authService'

export function onBackup(filename) {
  http.sendJwt(auth.jwt())
  return http.post('/api/database/backup', { filename }).then(data => data.data)
}

export function onRestore(filename) {
  http.sendJwt(auth.jwt())
  return http
    .post('/api/database/restore', { filename })
    .then(data => data.data)
}

export function getFiles() {
  http.sendJwt(auth.jwt())
  return http.get('/api/database/read-files').then(data => data.data.files)
}

export function getSql(filename) {
  http.sendJwt(auth.jwt())
  return http
    .post('/api/database/get-sql', { filename })
    .then(data => data.data.sql)
}
