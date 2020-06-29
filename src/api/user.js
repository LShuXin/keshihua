import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/v1/user/login',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_API
  })
}
export function login2(data) {
  return request({
    url: '/v1/user/login-sms',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_API
  })
}
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token },
    baseURL: process.env.VUE_APP_API
  })
}

export function logout() {
  return request({
    url: '/v1/user/logout',
    method: 'post',
    baseURL: process.env.VUE_APP_API
  })
}

