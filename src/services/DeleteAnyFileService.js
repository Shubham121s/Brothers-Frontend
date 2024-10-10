import ApiService from './ApiService'

export async function apiDeleteAnyFile(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/file/delete',
    method: 'delete',
    data
  })
}
