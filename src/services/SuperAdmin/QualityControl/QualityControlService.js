import ApiService from "../../ApiService";

export async function apiGetQualityControl(data) {
  return ApiService.fetchData({
    url: "v1/web/company/quality/lists",
    method: "post",
    data,
  });
}

export async function apiGetProductsByCustomerId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/quality/select/customer/id",
    method: "post",
    data,
  });
}
