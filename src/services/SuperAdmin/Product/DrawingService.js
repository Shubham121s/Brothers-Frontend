import ApiService from "../../ApiService";

export async function apiUploadDrawingAttachment(data) {
  return ApiService.fetchData({
    url: "v1/common/file/upload",
    method: "post",
    data,
  });
}
export async function apiViewDrawingAttachment(data) {
  return ApiService.fetchData({
    url: "v1/common/file/view",
    method: "post",
    data,
  });
}

export async function apiGetAllDrawingByProductId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/drawing/id",
    method: "post",
    data,
  });
}

export async function apiUpdateDrawingByDrawingId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/drawing/update/id",
    method: "put",
    data,
  });
}

export async function apiDeleteDrawingByDrawingId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/drawing/delete/id",
    method: "delete",
    data,
  });
}

export async function apiPostNewDrawing(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/drawing/register",
    method: "post",
    data,
  });
}

export async function apiPostNewDrawingRegister(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/drawing/register/new",
    method: "post",
    data,
  });
}
export async function apiPostDownloadDrawingAttachment(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/drawing/download/id",
    method: "post",
    data,
    responseType: "blob",
  });
}

export async function apiGetAllDrawingOption() {
  return ApiService.fetchData({
    url: "v1/web/company/product/drawing/option",
    method: "get",
  });
}
