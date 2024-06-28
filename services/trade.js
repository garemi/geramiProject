import Axios from "@/constants/VianaAxios.js";

const baseAPI = "trades";

const methods = {
  get: () => Axios.get(`/my-trades`),

  create: (data, params = {}) =>
    Axios.post(`/${baseAPI}/create`, data, { params }),

  update: (data, slug, params = {}) =>
    Axios.post(`/${baseAPI}/${slug}/update`, data, { params }),

  destroy: (slug, params = {}) =>
    Axios.delete(`/${baseAPI}/${slug}/delete`, { params }),
};

export default {
  ...methods,
};
