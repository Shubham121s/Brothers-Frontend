import ApiService from "../../ApiService"

export async function apiGetAllShippingInsurance() {
    return ApiService.fetchData({
        url: 'v1/web/company/shipping-insurance/select',
        method: 'get'
    })
}
export async function apiGetAllShippingInsuranceWithPagination(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/shipping-insurance',
        method: 'post',
        data
    })
}

export async function apiPostNewShippingInsurance(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/shipping-insurance/register',
        method: 'post',
        data
    })
}
export async function apiUpdateShippingInsurance(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/shipping-insurance/update',
        method: 'put',
        data
    })
}
export async function apiDeleteShippingInsurance(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/shipping-insurance/delete',
        method: 'delete',
        data
    })
}
