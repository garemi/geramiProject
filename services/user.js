import Axios from "@/constants/VianaAxios.js";

const baseAPI = "users";

export const get = (id, params = {}) =>
  Axios.get(`/${baseAPI}/index${id ? `/${id}` : ""}`, { params });

export const getByRoleName = (role, params = {}) =>
  Axios.get(`/${baseAPI}/list/${role}`, { params });

export const readMessages = (id, params = {}) =>
  Axios.get(`/${baseAPI}/messages/read${id ? `/${id}` : ""}`, { params });

export const getFreelancer = (id, params = {}) =>
  Axios.get(`/${baseAPI}/list/freelancer${id ? `/${id}` : ""}`, { params });

export const register = (cellphone) =>
  Axios.post(`${baseAPI}/pre/register`, {
    cellphone,
  });

export const forgot = (cellphone) => {
  const data = new FormData();
  data.append("cellphone", cellphone);

  return Axios.post(`${baseAPI}/pre/forgot`, data);
};

export const recovery = (data, params = {}) =>
  Axios.post(`${baseAPI}/forgot`, data, {
    params,
  });

export const auth = (data, params = {}) =>
  Axios.post(`${baseAPI}/register`, data, {
    params,
  });

export const create = (data, params = {}) =>
  Axios.post(`/${baseAPI}/create`, data, { params });

export const login = (data, params = {}) =>
  Axios.post(`/${baseAPI}/register`, data, { params });

export const update = (data, id, params = {}) =>
  Axios.post(`/${baseAPI}/update${id ? `/${id}` : ""}`, data, { params });

export const upgrade = (data) =>
  Axios.post(`/${baseAPI}/upgradeToSeller`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
  });

export const updatePassword = (data, id, params = {}) =>
  Axios.post(`/${baseAPI}/update/password${id ? `/${id}` : ""}`, data, {
    params,
  });

export const passwordUpdate = (data, id, params = {}) =>
  Axios.post(`/${baseAPI}/password/update${id ? `/${id}` : ""}`, data, {
    params,
  });
export const destroy = (id, params = {}) =>
  Axios.delete(`/${baseAPI}/${id}/delete`, { params });

export const selectedSkill = (data, params = {}) =>
  Axios.post(`/${baseAPI}/skills`, data, { params });

export const notifications = (id, params = {}) =>
  Axios.get(`/${baseAPI}/notifications${id ? `/${id}` : ""}`, { params });

export const send = (data, role, params = {}) =>
  Axios.post(`/${baseAPI}/notifications/send/${role}`, data, { params });

export const readNotification = (id, params = {}) =>
  Axios.post(
    `/${baseAPI}/notifications/read`,
    {
      notification: id,
    },
    { params },
  );

export const readAll = (params = {}) =>
  Axios.post(`/${baseAPI}/notifications/read`, {}, { params });

export const sendWithId = (data, params = {}) =>
  Axios.post(`/${baseAPI}/notifications/group/send`, data, { params });

export const destroyNotification = (id, params = {}) =>
  Axios.delete(`/${baseAPI}/notifications/delete/${id}`, { params });

export const bookmark = (slug, params = {}) =>
  Axios.get(`/${baseAPI}/bookmarks${slug ? `/${slug}` : ""}`, {
    params,
  });

export const purchase = (slug, params = {}) =>
  Axios.get(`/${baseAPI}/purchases${slug ? `/${slug}` : ""}`, {
    params,
  });

export const suggestsRemain = () => Axios.get(`/${baseAPI}/remain/suggests`);

export const charge = (data, params = {}) =>
  Axios.post(`/${baseAPI}/charge`, data, { params });

export const getVisits = (slug, params = {}) =>
  Axios.get(`/${baseAPI}/last/visits${slug ? `/${slug}` : ""}`, {
    params,
  });

export const syncCounty = (data, params = {}) =>
  Axios.post(`/${baseAPI}/sync/counties`, data, { params });

export const getReviews = (id, params = {}) =>
  Axios.get(`/${baseAPI}/reviews${id ? `/${id}` : ""}`, { params });

//users/notifications/send/group
export default {
  get,
  getByRoleName,
  getFreelancer,
  getVisits,
  create,
  update,
  destroy,
  login,
  register,
  auth,
  forgot,
  recovery,
  updatePassword,
  passwordUpdate,
  selectedSkill,
  notifications,
  send,
  sendWithId,
  destroyNotification,
  readNotification,
  readMessages,
  readAll,
  bookmark,
  purchase,
  suggestsRemain,
  charge,
  syncCounty,
  getReviews,
  upgrade,
};
