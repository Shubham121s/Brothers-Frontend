import ApiService from "../../ApiService";

export async function apiGetAllWorker(params) {
  return ApiService.fetchData({
    url: "v1/web/company/worker",
    method: "get",
    params,
  });
}
export async function apiPostAddWorker(data) {
  return ApiService.fetchData({
    url: "v1/web/company/worker/register",
    method: "post",
    data,
  });
}
export async function apiPutUpdateWorker(data) {
  return ApiService.fetchData({
    url: "v1/web/company/worker/update/id",
    method: "put",
    data,
  });
}
export async function apiDeleteWorker(data) {
  return ApiService.fetchData({
    url: "v1/web/company/worker/delete/id",
    method: "delete",
    data,
  });
}
export async function apiPutPasswordWorker(data) {
  return ApiService.fetchData({
    url: "v1/web/company/Worker/password/id",
    method: "put",
    data,
  });
}

export async function apiAttandanceById(data) {
  return ApiService.fetchData({
    url: "v1/web/company/worker/attendance/id",
    method: "post",
    data,
  });
}

export async function apiTotalAttandanceById(data) {
  return ApiService.fetchData({
    url: "v1/web/company/worker/attendance/total/id",
    method: "post",
    data,
  });
}

export async function apiMonthlyAttandanceById(data) {
  return ApiService.fetchData({
    url: "v1/web/company/worker/attendance/monthly/id",
    method: "post",
    data,
  });
}

export async function apiPostAttandanceById(data) {
  return ApiService.fetchData({
    url: "v1/web/company/worker/attendance/register/id",
    method: "post",
    data,
  });
}

export async function apiGetAllLedgerByWorkerId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/worker/ledger",
    method: "post",
    data,
  });
}

export async function apiGetWorkerDetailsByWorkerId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/worker/id",
    method: "post",
    data,
  });
}

export async function apiPayLedgerAmountByWorkerId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/worker/ledger/pay",
    method: "post",
    data,
  });
}
