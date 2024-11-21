import ApiService from "../../ApiService";

export async function apiGetProductYearlySalesQuantity(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/dashboard/yearly",
    method: "post",
    data,
  });
}

export async function apiGetProductMonthlySalesQuantity(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/dashboard/month",
    method: "post",
    data,
  });
}

export async function apiGetAllProductsOption(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/option",
    method: "post",
    data,
  });
}

export async function apiGetYears() {
  return ApiService.fetchData({
    url: "v1/web/company/customer/dashboard/years",
    method: "get",
  });
}

export async function apiGetAllProductByYearMonth(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/dashboard/dynamic",
    method: "post",
    data,
  });
}

export async function apiGetProductsByCategory() {
  return ApiService.fetchData({
    url: "v1/web/company/product/dashboard/by/category",
    method: "get",
  });
}

export async function apiGetTopSellingProduct() {
  return ApiService.fetchData({
    url: "v1/web/company/product/dashboard/top/selling/product",
    method: "get",
  });
}
