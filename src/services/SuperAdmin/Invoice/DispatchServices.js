import ApiService from "../../ApiService";

export async function apiCheckInvoiceNumber(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch/check/invoice/number",
    method: "post",
    data,
  });
}

export async function apiRegisterNewDispatchDomesticInvoice(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch/domestic/register",
    method: "post",
    data,
  });
}
export async function apiRegisterNewDispatchForeignInvoice(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch/foreign/register",
    method: "post",
    data,
  });
}

export async function apiUpdateForeignInvoiceDate(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch/foreign/invoice/date/update",
    method: "put",
    data,
  });
}

export async function apiGetDispatchForeignInvoiceByInvoiceId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch/foreign/invoice/id",
    method: "post",
    data,
  });
}
export async function apiGetDispatchDomesticInvoiceByInvoiceId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch/domestic/invoice/id",
    method: "post",
    data,
  });
}
//test
export async function apiGetDispatchDomesticInvoiceByInvoiceIdTest(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch/domestic/edit/invoice/id",
    method: "post",
    data,
  });
}

export async function apiPutDispatchDomesticInvoiceByInvoiceId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch/domestic/packing/update",
    method: "put",
    data,
  });
}

export async function apiGetAllDispatchInvoiceWithPagination(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch",
    method: "post",
    data,
  });
}

export async function apiAddInvoiceDetails(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch/details/id",
    method: "post",
    data,
  });
}

//  DISPATCH LIST SERVICES
export async function apiUpdateDispatchListByDispatchListId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch-list/id",
    method: "put",
    data,
  });
}

export async function apiDeleteDispatchListByDispatchListId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch-list/delete/id",
    method: "delete",
    data,
  });
}
export async function apiUpdateDispatchMachiningRawDate(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch-list/raw/machining/date",
    method: "post",
    data,
  });
}

export async function apiUpdateDispatchListAddProduct(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch-list/add/product",
    method: "post",
    data,
  });
}

export async function apiAddBoxForeignInvoiceEdit(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch-list/add/box",
    method: "post",
    data,
  });
}

export async function apiDeleteBox(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch-list/delete/box",
    method: "delete",
    data,
  });
}

export async function apiUpdateBox(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch-list/update/box",
    method: "put",
    data,
  });
}

export async function apiDeleteInvoice(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch/delete",
    method: "delete",
    data,
  });
}

//PATTERN INVOICE DISPATCH
export async function apiRegisterNewDispatchPatternInvoice(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch/pattern/register",
    method: "post",
    data,
  });
}

export async function apiAllPatternInvoicePagination(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch/pattern",
    method: "post",
    data,
  });
}

export async function apiGetDispatchPatterInvoiceByInvoiceId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch/Pattern/invoice/id",
    method: "post",
    data,
  });
}

export async function updatePatterInvoiceById(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch/patternList/id",
    method: "put",
    data,
  });
}

export async function apiAddPatternProductToInvoice(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/pattern/update/product",
    method: "put",
    data,
  });
}

export async function apiDeletePatternProductToInvoice(data) {
  return ApiService.fetchData({
    url: "v1/web/company/product/pattern/delete",
    method: "delete",
    data,
  });
}

export async function apiGetAllInvoiceNumber(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch/invoice/number",
    method: "get",
    data,
  });
}

export async function apiGetAllCustomersOption() {
  return ApiService.fetchData({
    url: "v1/web/company/customer/option",
    method: "get",
  });
}

export async function apiGetAllInvoiceDates() {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch/invoice/date",
    method: "get",
  });
}

export async function apiGetYears() {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch/invoice/years",
    method: "get",
  });
}

export async function apiGetMonths() {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch/invoice/months",
    method: "get",
  });
}

export async function apiUpdateStatus(data) {
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch/update/status",
    method: "put",
    data,
  });
}

export async function apiUpdatePatternStatus(data) {
  console.log("data", data);
  return ApiService.fetchData({
    url: "v1/web/company/invoice/dispatch/patternInvoice/update/status",
    method: "put",
    data,
  });
}
