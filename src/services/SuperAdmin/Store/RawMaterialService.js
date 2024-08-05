import ApiService from "../../ApiService";

export async function apiPostNewRawMaterial(data) {
  return ApiService.fetchData({
    url: "v1/web/company/raw/material/register",
    method: "post",
    data,
  });
}

export async function apiGetAllRawMaterial(data) {
  return ApiService.fetchData({
    url: "v1/web/company/raw/material",
    method: "post",
    data,
  });
}

export async function apiUpdateRawMaterial(data) {
  return ApiService.fetchData({
    url: "v1/web/company/raw/material/update/id",
    method: "post",
    data,
  });
}
