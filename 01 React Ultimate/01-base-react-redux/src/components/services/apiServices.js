import axios from "../utils/axiosCustomize";

export async function postCreateNewUser(email, password, username, role, image) {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axios.post("api/v1/participant", data);
}

export async function putUpdateUser(id, username, role, image) {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axios.put("api/v1/participant", data);
}

export async function deleteUser(id) {
  return axios.delete("api/v1/participant", { data: { id } });
}

export async function getAllUsers() {
  return axios.get("api/v1/participant/all");
}

export async function getUsersWithPaginate(page, limit) {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

export async function postLogin(email, password) {
  return axios.post("api/v1/login", { email, password });
}

export async function postRegister(email, username, password) {
  return axios.post("api/v1/register", { email, username, password });
}
