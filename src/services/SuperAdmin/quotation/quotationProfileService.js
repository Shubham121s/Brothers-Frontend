import ApiService from "../../ApiService";

export async function apiPostNewQuotationProfile(data) {
  return ApiService.fetchData({
    url: "v1/web/company/quotation/profile/register",
    method: "post",
    data,
  });
}

export async function apiGwtAllQuotationProfileData(data) {
  return ApiService.fetchData({
    url: "v1/web/company/quotation/profile/all",
    method: "post",
    data,
  });
}

export async function apiGetAllQuotationProfile(data) {
  return ApiService.fetchData({
    url: "v1/web/company/quotation/profile",
    method: "post",
    data,
  });
}

export async function apiUpdateQuotationProfile(data) {
  return ApiService.fetchData({
    url: "v1/web/company/quotation/profile/update/id",
    method: "post",
    data,
  });
}

export async function apideleteQuotationProfile(data) {
  return ApiService.fetchData({
    url: "v1/web/company/quotation/profile/delete/id",
    method: "delete",
    data,
  });
}
