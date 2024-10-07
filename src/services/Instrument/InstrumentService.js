import ApiService from '../ApiService'

export async function apiInstrument(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/instrument',
    method: 'post',
    data
  })
}

export async function apiAllInstrument(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/instrument/all',
    method: 'get',
    data
  })
}

export async function apiPostNewInstrument(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/instrument/register',
    method: 'post',
    data
  })
}

export async function apiPutEditInstrument(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/instrument/update',
    method: 'put',
    data
  })
}

export async function apiDeleteInstrument(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/instrument/delete',
    method: 'delete',
    data
  })
}
