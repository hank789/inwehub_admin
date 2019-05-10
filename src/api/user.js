import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/profile/info',
    method: 'post',
    params: {}
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

export function sendYzmCode(data) {
  return request({
    url: '/auth/sendPhoneCode',
    method: 'post',
    data
  })
}
