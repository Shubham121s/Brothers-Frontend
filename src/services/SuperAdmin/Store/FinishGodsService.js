import ApiService from "../../ApiService";

export async function apiGetAllFinishGoods(data) {
  return ApiService.fetchData({
    url: "v1/web/company/finish/good",
    method: "post",
    data,
  });
}

export async function apiPostNewFinishGoods(data) {
  return ApiService.fetchData({
    url: "v1/web/company/finish/good/register",
    method: "post",
    data,
  });
}

export async function apiUpdateFinishGoods(data) {
  return ApiService.fetchData({
    url: "v1/web/company/finish/good/update/id",
    method: "post",
    data,
  });
}
