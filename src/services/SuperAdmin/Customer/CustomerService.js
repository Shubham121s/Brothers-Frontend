import ApiService from "../../ApiService";

export async function apiGetCustomerStatisticData() {
  return ApiService.fetchData({
    url: "v1/web/company/customer/statistic",
    method: "get",
  });
}

// export async function apiDeleteCustomer(data) {
//   return ApiService.fetchData({
//     url: "v1/web/company/customer/delete",
//     method: "delete",
//     data,
//   });
// }

export async function apiUpdateCustomerDetails(data) {
  return ApiService.fetchData({
    url: "v1/web/company/customer/update",
    method: "put",
    data,
  });
}

export async function apiGetAllCustomers(data) {
  return ApiService.fetchData({
    url: "v1/web/company/customer/select",
    method: "get",
  });
}

export async function apiPostRegisterNewCustomer(data) {
  return ApiService.fetchData({
    url: "v1/web/company/customer/register",
    method: "post",
    data,
  });
}

export async function apiUpdateCustomer(data) {
  return ApiService.fetchData({
    url: "v1/web/company/customer/update/id",
    method: "put",
    data,
  });
}
export async function apiGetCustomersWithPagination(data) {
  return ApiService.fetchData({
    url: "v1/web/company/customer",
    method: "post",
    data,
  });
}

export async function apiGetCustomerDetailsByCustomerId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/customer/details/id",
    method: "post",
    data,
  });
}

export async function apiGetAllCustomersOption() {
  return ApiService.fetchData({
    url: "v1/web/company/customer/option",
    method: "get",
  });
}

export async function apiDeleteCustomer(data) {
  return ApiService.fetchData({
    url: "v1/web/company/customer/delete/id",
    method: "delete",
    data,
  });
}
