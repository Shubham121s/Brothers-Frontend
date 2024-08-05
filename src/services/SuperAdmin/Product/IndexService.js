import ApiService from "../../ApiService";

// export async function apiGetAllProducts(data) {
//     return ApiService.fetchData({
//         url: 'v1/common/product',
//         method: 'get'
//     })
// }

export async function apiGetProductDetailsWithoutDrawing(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/details/id",
    method: "post",
    data,
  });
}
export async function apiGetProductForNewDrawing(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/drawing/id",
    method: "post",
    data,
  });
}

export async function apiGetAllProductsWithPagination(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product",
    method: "post",
    data,
  });
}

export async function apiPostNewProduct(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/register",
    method: "post",
    data,
  });
}

export async function apiUpdateProduct(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/update/id",
    method: "put",
    data,
  });
}

export async function apiDeleteProduct(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/delete/id",
    method: "delete",
    data,
  });
}

export async function apiGetProductDetailsByProductId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/details/id",
    method: "post",
    data,
  });
}

export async function apiDeleteProductByProductId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/delete",
    method: "delete",
    data,
  });
}

export async function apiUpdateProductDetailsByProductId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/update",
    method: "put",
    data,
  });
}
export async function apiGetAllProductsWithDrawing(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/drawing/select",
    method: "get",
  });
}

export async function apiGetAllProductsCategoryId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/category/id",
    method: "post",
    data,
  });
}

export async function apiGetAllProductsItemCodeOption() {
  return ApiService.fetchData({
    url: "v1/web/company/product/itemCode/option",
    method: "get",
  });
}

export async function apiGetAllProductsOption() {
  return ApiService.fetchData({
    url: "v1/web/company/product/option",
    method: "get",
  });
}
