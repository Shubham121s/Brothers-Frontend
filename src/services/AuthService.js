import ApiService from './ApiService'

export async function apiSignInRequest(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/user/auth/login',
    method: 'post',
    data
  })
}

export async function apiGetNavigation(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/module',
    method: 'post',
    data
  })
}
