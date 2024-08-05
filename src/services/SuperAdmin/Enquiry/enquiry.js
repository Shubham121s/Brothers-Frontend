import ApiService from "../../ApiService";

export async function apiPostNewEnquiry(data) {
  return ApiService.fetchData({
    url: "v1/web/company/enquiry/register/enquiry",
    method: "post",
    data,
  });
}

export async function apiPostNewEnquiryList(data) {
  return ApiService.fetchData({
    url: "v1/web/company/enquiry/register",
    method: "post",
    data,
  });
}

export async function apiGetAllEnquiry(data) {
  return ApiService.fetchData({
    url: "v1/web/company/enquiry",
    method: "post",
    data,
  });
}

export async function apiPostNewEnquiryreview(data) {
  return ApiService.fetchData({
    url: "v1/web/company/enquiry/review",
    method: "post",
    data,
  });
}

export async function apiGetEnquiryDetailsByEnquiryId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/enquiry/list",
    method: "post",
    data,
  });
}

export async function apiDeleteSelectedMaterial(data) {
  return ApiService.fetchData({
    url: "v1/web/company/enquiry/delete/id",
    method: "delete",
    data,
  });
}

export async function apiGetReviewById(data) {
  return ApiService.fetchData({
    url: "v1/web/company/enquiry/review/id",
    method: "post",
    data,
  });
}
