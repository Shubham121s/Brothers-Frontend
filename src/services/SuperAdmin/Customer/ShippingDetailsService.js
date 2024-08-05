import ApiService from "../../ApiService"


export async function apiPostNewCustomerShippingDetailsByCustomerId(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/customer/shipping-details/register',
        method: 'post',
        data
    })
}
export async function apiDeleteCustomerShippingDetailsByShippingDetailsId(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/customer/shipping-details/delete',
        method: 'delete',
        data
    })
}
export async function apiUpdateCustomerShippingDetailsByShippingDetailsId(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/customer/shipping-details/update',
        method: 'put',
        data
    })
}
export async function apiGetCustomerShippingDetailsByCustomerId(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/customer/shipping-details/select/customer/id',
        method: 'post',
        data
    })
}