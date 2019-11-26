import http from './httpService'
import auth from './authService'

export function status() {
	http.sendJwt(auth.jwt())
	return http.get('/settings/sms/status').then(data => data.data.on)
}

export function getCode() {
	http.sendJwt(auth.jwt())
	return http.get('/settings/sms/code').then(data => data.data.code)
}

export function updateCode(code) {
	http.sendJwt(auth.jwt())
	return http.post('/settings/sms/code', {code}).then(data => data.data.code)
}

export function toggle() {
	http.sendJwt(auth.jwt())
	return http.get('/settings/sms/toggle').then(data => data.data.on)
}
