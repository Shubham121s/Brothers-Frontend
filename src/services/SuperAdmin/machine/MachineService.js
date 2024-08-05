import ApiService from "../../ApiService";

export async function apiGetMachine(data) {
  return ApiService.fetchData({
    url: "v1/web/company/machine",
    method: "post",
    data,
  });
}
export async function apiPostMachine(data) {
  return ApiService.fetchData({
    url: "v1/web/company/machine/register",
    method: "post",
    data,
  });
}

export async function apiPostMachineBreakDown(data) {
  return ApiService.fetchData({
    url: "v1/web/company/breakdown/register",
    method: "post",
    data,
  });
}

export async function apiUpdateMachine(data) {
  return ApiService.fetchData({
    url: "v1/web/company/machine/update/id",
    method: "put",
    data,
  });
}
export async function apiDeleteMachine(data) {
  return ApiService.fetchData({
    url: "v1/web/company/machine/delete/id",
    method: "delete",
    data,
  });
}
