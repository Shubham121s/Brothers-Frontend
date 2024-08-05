import ApiService from "../../ApiService"


export async function apiGetAllSelectCategories() {
    return ApiService.fetchData({
        url: 'v1/web/company/product/category/select',
        method: 'get',
    })
}

export async function apiGetAllCategories(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/product/category',
        method: 'post',
        data
    })
}

export async function apiPostNewCategory(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/product/category/register',
        method: 'post',
        data
    })
}
export async function apiUpdateCategory(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/product/category/update',
        method: 'put',
        data
    })
}
export async function apiDeleteCategory(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/product/category/delete',
        method: 'delete',
        data
    })
}