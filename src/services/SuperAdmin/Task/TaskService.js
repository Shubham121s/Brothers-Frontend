import ApiService from "../../ApiService";

export async function apiGetAllTaskList(data) {
  return ApiService.fetchData({
    url: "v1/web/company/task",
    method: "post",
    data,
  });
}

export async function apiPostTaskList(data) {
  return ApiService.fetchData({
    url: "v1/web/company/task/register",
    method: "post",
    data,
  });
}

export async function apiGetUserList() {
  return ApiService.fetchData({
    url: "v1/web/company/user/option",
    method: "post",
  });
}
export async function apiPutTaskList(data) {
  return ApiService.fetchData({
    url: "v1/web/company/task/update/id",
    method: "put",
    data,
  });
}

export async function apiDeleteTaskList(data) {
  return ApiService.fetchData({
    url: "v1/web/company/task/delete/id",
    method: "delete",
    data,
  });
}

export async function apiGetChatByTaskId(data) {
  return ApiService.fetchData({
    url: "v1/web/company/task/chat",
    method: "post",
    data,
  });
}

export async function apiPostChat(data) {
  return ApiService.fetchData({
    url: "v1/web/company/task/chat/register",
    method: "post",
    data,
  });
}

export async function apiGetUserStatus(data) {
  return ApiService.fetchData({
    url: "v1/web/company/task//user/status",
    method: "post",
    data,
  });
}
