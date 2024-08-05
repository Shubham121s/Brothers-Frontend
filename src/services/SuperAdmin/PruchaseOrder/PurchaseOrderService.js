import ApiService from "../../ApiService";

export async function apiGetPurchaseOrderDetailsByPurchaseORderId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/purchase/order/id",
    method: "post",
    data,
  });
}

export async function apiUpdatePurchaseOrderStatus(data) {
  return ApiService.fetchData({
    url: "v1/web/company/purchase/order/status",
    method: "post",
    data,
  });
}
