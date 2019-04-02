import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  let userLoginInfo = window.localStorage.getItem('UserLoginInfo')
  if (userLoginInfo) {
    userLoginInfo = JSON.parse(window.localStorage.getItem('UserLoginInfo'))
    return userLoginInfo.token
  }

  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
