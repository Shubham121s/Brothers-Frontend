import ApiService from "../../ApiService";

export async function apiGetAllConsumableItem(data) {
  return ApiService.fetchData({
    url: "v1/web/company/consumable/item",
    method: "post",
    data,
  });
}

export async function apiPostConsumableItem(data) {
  return ApiService.fetchData({
    url: "v1/web/company/consumable/item/register",
    method: "post",
    data,
  });
}

export async function apiUpdateConsumableItem(data) {
  return ApiService.fetchData({
    url: "v1/web/company/consumable/item/update/id",
    method: "post",
    data,
  });
}
