import ApiService from "../../ApiService";

export async function apiGetAllPatterns() {
    return ApiService.fetchData({
        url: 'v1/web/company/product/pattern/select',
        method: 'get',
    })
}

export async function apiGetAllPatternsWithPagination(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/product/pattern',
        method: 'post',
        data
    })
}
export async function apiPostNewPattern(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/product/pattern/register',
        method: 'post',
        data
    })
}
export async function apiUpdatePattern(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/product/pattern/update',
        method: 'put',
        data
    })
}
export async function apiDeletePattern(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/product/pattern/delete',
        method: 'delete',
        data
    })
}
