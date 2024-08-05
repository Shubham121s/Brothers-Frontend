import ApiService from "../ApiService";

export async function apiGetDashboardData() {
    return ApiService.fetchData({
        url: 'v1/web/company/dashboard',
        method: 'get'
    })
}