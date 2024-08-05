import ApiService from "../../ApiService"


export async function apiPostNewCustomerShippingAddressByCustomerId(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/customer/shipping-address/register',
        method: 'post',
        data
    })
}
export async function apiDeleteCustomerShippingAddressByShippingAddressId(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/customer/shipping-address/delete',
        method: 'delete',
        data
    })
}
export async function apiUpdateCustomerShippingAddressByShippingAddressId(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/customer/shipping-address/update',
        method: 'put',
        data
    })
}

export async function apiGetCustomerShippingAddressByCustomerId(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/customer/shipping-address/select/customer/id',
        method: 'post',
        data
    })
}

