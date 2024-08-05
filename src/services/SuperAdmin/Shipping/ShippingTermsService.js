import ApiService from "../../ApiService"

export async function apiGetAllShippingTerm() {
    return ApiService.fetchData({
        url: 'v1/web/company/shipping-term/select',
        method: 'get'
    })
}
export async function apiGetAllShippingTermWithPagination(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/shipping-term',
        method: 'post',
        data
    })
}
