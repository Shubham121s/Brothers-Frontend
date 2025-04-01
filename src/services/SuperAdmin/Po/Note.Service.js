import ApiService from "../../ApiService";

export async function apiNewNoteRegister(data) {
  return ApiService.fetchData({
    url: "v1/web/company/note/register",
    method: "post",
    data,
  });
}

export async function apiGetAllNotes(data) {
  return ApiService.fetchData({
    url: "v1/web/company/note",
    method: "post",
    data,
  });
}

export async function apiGetAllNotesWithOutPagination(data) {
  return ApiService.fetchData({
    url: "v1/web/company/note/all",
    method: "get",
    data,
  });
}

export async function apiUpdateNotes(data) {
  return ApiService.fetchData({
    url: "v1/web/company/note/update/id",
    method: "put",
    data,
  });
}

export async function apiDeleteNote(data) {
  return ApiService.fetchData({
    url: "v1/web/company/note/delete/id",
    method: "delete",
    data,
  });
}

export async function apiNewConditionRegister(data) {
  return ApiService.fetchData({
    url: "v1/web/company/condition/register",
    method: "post",
    data,
  });
}

export async function apiGetAllCondition(data) {
  return ApiService.fetchData({
    url: "v1/web/company/condition",
    method: "post",
    data,
  });
}

export async function apiUpdateCondition(data) {
  return ApiService.fetchData({
    url: "v1/web/company/condition/update/id",
    method: "put",
    data,
  });
}

export async function apiGetAllConditionWithOutPagination(data) {
  return ApiService.fetchData({
    url: "v1/web/company/condition/all",
    method: "post",
    data,
  });
}

export async function apiDeleteCondition(data) {
  return ApiService.fetchData({
    url: "v1/web/company/condition/delete/id",
    method: "delete",
    data,
  });
}
