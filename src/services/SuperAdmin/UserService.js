import ApiService from "../ApiService";

export async function apiGetAllUserWithPagination(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/user',
        method: 'post',
        data,
    })
}


export async function apiPostNewUserRegister(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/user/register',
        method: 'post',
        data,
    })
}

export async function apiUpdateUserDetails(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/user/update',
        method: 'put',
        data,
    })
}
export async function apiDeleteUser(data) {
    return ApiService.fetchData({
        url: 'v1/web/company/user/delete',
        method: 'delete',
        data,
    })
}

