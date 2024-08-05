import ApiService from "../../ApiService";

export async function apiGetAllMaterialGrades() {
  return ApiService.fetchData({
    url: "v1/web/company/product/material-grade/select",
    method: "get",
  });
}
export async function apiGetAllMaterialGradesWithPagination(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/material-grade",
    method: "post",
    data,
  });
}
export async function apiPostNewMaterialGrades(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/material-grade/register",
    method: "post",
    data,
  });
}
export async function apiUpdateMaterialGrades(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/material-grade/update",
    method: "put",
    data,
  });
}
export async function apiDeleteMaterialGrades(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/material-grade/delete",
    method: "delete",
    data,
  });
}

export async function apiGetMaterialGradesOption() {
  return ApiService.fetchData({
    url: "v1/web/company/product/material-grade/option",
    method: "get",
  });
}
