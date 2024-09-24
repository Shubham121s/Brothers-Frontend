import ApiService from '../../ApiService'

export async function apiIsPONumberExists(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/po/Number/check',
    method: 'post',
    data
  })
}

export async function apiNewPoRegister(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/po/register',
    method: 'post',
    data
  })
}

export async function apiUpdatePo(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/po/update/id',
    method: 'post',
    data
  })
}

export async function apiDeletePo(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/po/delete/id',
    method: 'delete',
    data
  })
}
export async function apiGetPoDetailsByPoId(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/po/id',
    method: 'post',
    data
  })
}
export async function apiGetAllPoWithPagination(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/po',
    method: 'post',
    data
  })
}

export async function apiGetPODates(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/po/dates',
    method: 'post',
    data
  })
}

export async function apiGetPODeliveryDates(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/po/delivery/dates',
    method: 'post',
    data
  })
}

export async function apiGetPOBrotherAcceptDates(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/po/accept/delivery/dates',
    method: 'post',
    data
  })
}

export async function apiGetRawDates(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/po/raw/dates',
    method: 'post',
    data
  })
}

export async function apiGetMachiningDates(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/po/machining/dates',
    method: 'post',
    data
  })
}

export async function apiUpdatePOListByPOListId(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/po-list/id',
    method: 'put',
    data
  })
}

export async function apiGetPoListByPOListId(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/po-list/list/id',
    method: 'post',
    data
  })
}

export async function apiGetAcceptedPoInvoice(data) {
  return ApiService.fetchData({
    url: 'v1/web/admin/po/invoice/accept',
    method: 'post',
    data
  })
}
export async function apiGetAllPosByCustomerId(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/po/select/customer/id',
    method: 'post',
    data
  })
}

export async function apiGetUniquePONumber() {
  return ApiService.fetchData({
    url: 'v1/web/company/po/Unique/number',
    method: 'get'
  })
}

export async function apiGetAllPoLists(params) {
  return ApiService.fetchData({
    url: 'v1/web/company/po/lists',
    method: 'get',
    params
  })
}
export async function apiGetPoNumber(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/po/number/po',
    method: 'post',
    data
  })
}

export async function apiGetAllProjectNumbers(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/po-list/po/number',
    method: 'post',
    data
  })
}

export async function apiGetAllSerialNumber(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/po-list/serial/number',
    method: 'post',
    data
  })
}

export async function apiPutAttachmentsPoList(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/po-list/attachment',
    method: 'put',
    data
  })
}

export async function apideleteAttachmentsPoList(data) {
  return ApiService.fetchData({
    url: 'v1/web/company/po-list/attachment/delete',
    method: 'put',
    data
  })
}
