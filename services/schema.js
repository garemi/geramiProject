import Axios from "@/constants/VianaAxios.js";

const baseAPI = "schema";

const methods = {
  get: (slug, params = {}) =>
    Axios.get(`/${baseAPI}/index${slug ? `/${slug}` : ""}`, { params }),

  create: (data, params = {}) =>
    Axios.post(`/${baseAPI}/create`, data, { params }),

  update: (data, slug, params = {}) =>
    Axios.post(`/${baseAPI}/${slug}/update`, data, { params }),
};

export default {
  ...methods,
};
