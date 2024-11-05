import ApiService from '../../ApiService'

export async function apiDynamicDashboardData(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/customer/dashboard/dynamic',
    method: 'post',
    data
  })
}

export async function apiGetYears() {
  return ApiService.fetchData({
    url: 'v1/web/company/customer/dashboard/years',
    method: 'get'
  })
}

export async function apiMonthlySalesData(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/customer/dashboard/month',
    method: 'post',
    data
  })
}

export async function apiYearlySalesData(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/customer/dashboard/yearly',
    method: 'post',
    data
  })
}
