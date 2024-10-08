import ApiService from '../ApiService'

export async function apiGetDashboardData() {
  return ApiService.fetchData({
    url: 'v1/web/company/dashboard',
    method: 'get'
  })
}

//Instruments
export async function apiGetInstrumentDashboardData(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/instrument/dashboard',
    method: 'post',
    data
  })
}
