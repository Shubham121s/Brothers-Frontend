import ApiService from "../../ApiService";

export async function apiGetAllProductCodeOption() {
  return ApiService.fetchData({
    url: "v1/web/company/product/codes",
    method: "get",
  });
}

export async function apiGetAllStockData(data) {
  return ApiService.fetchData({
    url: "v1/web/company/po-list/customer/id",
    method: "post",
    data,
  });
}

export async function apiGetAllStock(params) {
  return ApiService.fetchData({
    url: "v1/web/company/stock",
    method: "get",
    params,
  });
}

export async function apiDeleteStock(data) {
  return ApiService.fetchData({
    url: "v1/web/company/stock/delete/id",
    method: "delete",
    data,
  });
}

export async function apiPutStock(data) {
  return ApiService.fetchData({
    url: "v1/web/company/stock/update/id",
    method: "put",
    data,
  });
}

export async function apiPostStock(data) {
  return ApiService.fetchData({
    url: "v1/web/company/stock/register",
    method: "post",
    data,
  });
}

export async function apiNewPurchaseOrderoRegister(data) {
  return ApiService.fetchData({
    url: "v1/web/company/purchase/order/register",
    method: "post",
    data,
  });
}

export async function apiUpdatePurchaseOrder(data) {
  return ApiService.fetchData({
    url: "v1/web/company/purchase/order/update/id",
    method: "put",
    data,
  });
}

export async function apiGetAllPurchaseOrderWithPagination(data) {
  return ApiService.fetchData({
    url: "v1/web/company/purchase/order",
    method: "post",
    data,
  });
}

export async function apiGetPurchaseOrderDetailsByPurchaseORderId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/purchase/order/id",
    method: "post",
    data,
  });
}

export async function apiUpdatePurchaseOrderListByPurchaseOrderListId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/purchase/order/list/id",
    method: "put",
    data,
  });
}

export async function apiGetAllGRN(data) {
  return ApiService.fetchData({
    url: "v1/web/company/purchase/order/list/grn",
    method: "post",
    data,
  });
}

export async function apiGetGRNDetails(data) {
  return ApiService.fetchData({
    url: "v1/web/company/purchase/order/list/grn/details",
    method: "post",
    data,
  });
}

export async function apiUpdatePurchaseOrderListByPurchaseOrderListIdOnQuantityReceived(
  data
) {
  return ApiService.fetchData({
    url: "v1/web/company/purchase/order/list/quantity/id",
    method: "put",
    data,
  });
}
