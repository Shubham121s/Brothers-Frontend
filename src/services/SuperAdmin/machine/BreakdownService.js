import ApiService from "../../ApiService";

export async function apiGetBreakdown(data) {
  return ApiService.fetchData({
    url: "v1/web/company/breakdown",
    method: "post",
    data,
  });
}
export async function apiPostBreakdown(data) {
  return ApiService.fetchData({
    url: "v1/web/company/breakdown/register",
    method: "post",
    data,
  });
}

export async function apiUpdateBreakdown(data) {
  return ApiService.fetchData({
    url: "v1/web/company/breakdown/update/id",
    method: "put",
    data,
  });
}
export async function apiDeleteBreakdown(data) {
  return ApiService.fetchData({
    url: "v1/web/company/breakdown/delete/id",
    method: "delete",
    data,
  });
}
