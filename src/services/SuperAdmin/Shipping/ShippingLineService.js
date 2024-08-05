import ApiService from "../../ApiService"

export async function apiGetAllShippingLine() {
    return ApiService.fetchData({
        url: 'v1/web/company/shipping-line/select',
        method: 'get'
    })
}
export async function apiGetAllShippingLineWithPagination(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/shipping-line',
        method: 'post',
        data
    })
}