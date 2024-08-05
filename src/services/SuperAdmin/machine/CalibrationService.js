import ApiService from "../../ApiService";

export async function apiGetCalibration(data) {
  return ApiService.fetchData({
    url: "v1/web/company/calibration",
    method: "post",
    data,
  });
}

export async function apiPostCalibration(data) {
  return ApiService.fetchData({
    url: "v1/web/company/calibration/register",
    method: "post",
    data,
  });
}

export async function apiUpdateCalibration(data) {
  return ApiService.fetchData({
    url: "v1/web/company/calibration/update/id",
    method: "put",
    data,
  });
}
export async function apiDeleteCalibration(data) {
  return ApiService.fetchData({
    url: "v1/web/company/calibration/delete/id",
    method: "delete",
    data,
  });
}
