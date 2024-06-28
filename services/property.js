import Axios from "@/constants/VianaAxios.js";

const baseAPI = "properties";

const methods = {
  get: (slug, params = {}) =>
    Axios.get(`/${baseAPI}/index${slug ? `/${slug}` : ""}`, { params }),

  create: (data, params = {}) =>
    Axios.post(`/${baseAPI}/create`, data, { params }),

  update: (data, slug, params = {}) =>
    Axios.post(`/${baseAPI}/${slug}/update`, data, { params }),

  destroy: (slug, params = {}) =>
    Axios.delete(`/${baseAPI}/${slug}/delete`, { params }),

  getBalance: (slug, params = {}) =>
    Axios.get(`/${baseAPI}/balance${slug ? `/${slug}` : ""}`, { params }),

  createConversation: (id, data, params = {}) =>
    Axios.post(`/${baseAPI}/${id}/conversation`, data, { params }),
};

export default {
  ...methods,
};
