import ApiService from "../../ApiService";

export async function apiPostInward(data) {
  return ApiService.fetchData({
    url: "v1/web/company/inward/register",
    method: "post",
    data,
  });
}

export async function apiPostAttachment(data) {
  return ApiService.fetchData({
    url: "v1/web/company/inward/attachment",
    method: "post",
    data,
  });
}

export async function apiPutAttachment(data) {
  return ApiService.fetchData({
    url: "v1/web/company/inward/upload/attachment",
    method: "put",
    data,
  });
}

export async function apiGetAllInward(data) {
  return ApiService.fetchData({
    url: "v1/web/company/inward",
    method: "post",
    data,
  });
}

export async function apiGetIwardById(data) {
  return ApiService.fetchData({
    url: "v1/web/company/inward/id",
    method: "post",
    data,
  });
}

export async function apiGetNewGRNNumber() {
  return ApiService.fetchData({
    url: "v1/web/company/inward/generate/grn",
    method: "get",
  });
}
