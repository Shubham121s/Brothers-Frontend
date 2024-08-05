import ApiService from "../../ApiService";

export async function apiGetAllUnusedItem(data) {
  return ApiService.fetchData({
    url: "v1/web/company/unused/item",
    method: "post",
    data,
  });
}

export async function apiPostUnusedItem(data) {
  return ApiService.fetchData({
    url: "v1/web/company/unused/item/register",
    method: "post",
    data,
  });
}

export async function apiUpdateUnusedItem(data) {
  return ApiService.fetchData({
    url: "v1/web/company/unused/item/update/id",
    method: "post",
    data,
  });
}
