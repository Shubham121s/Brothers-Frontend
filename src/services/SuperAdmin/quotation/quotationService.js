import ApiService from "../../ApiService";

export async function apiPostNewQuotation(data) {
  return ApiService.fetchData({
    url: "v1/web/company/quotation/register",
    method: "post",
    data,
  });
}

export async function apiGetQuotation(data) {
  return ApiService.fetchData({
    url: "v1/web/company/quotation",
    method: "post",
    data,
  });
}

export async function apiGetQuotationDetailById(data) {
  return ApiService.fetchData({
    url: "v1/web/company/quotation/id",
    method: "post",
    data,
  });
}

export async function apiUpdateQuotationStatus(data) {
  return ApiService.fetchData({
    url: "v1/web/company/quotation/status",
    method: "post",
    data,
  });
}

export async function apiUpdateQuotationById(data) {
  return ApiService.fetchData({
    url: "v1/web/company/quotation/update/id",
    method: "put",
    data,
  });
}
