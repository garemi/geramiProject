import Axios from "@/constants/VianaAxios.js";

const baseAPI = "categories";

const methods = {
  get: (slug, params = {}) =>
    Axios.get(`/${baseAPI}/index${slug ? `/${slug}` : ""}`, { params }),

  // getCourses: (slug, params = {}) =>
  //   Axios.get(`/${baseAPI}/course/index${slug ? `/${slug}` : ""}`, { params }),

  // getProjects: (slug, params = {}) =>
  //   Axios.get(`/${baseAPI}/project/index${slug ? `/${slug}` : ""}`, {
  //     params,
  //   }),
  getWithType: (type, slug, params = {}) =>
    Axios.get(`/${baseAPI}/${type}/index${slug ? `/${slug}` : ""}`, { params }),

  create: (data, params = {}) =>
    Axios.post(`/${baseAPI}/create`, data, { params }),

  createProjects: (data, params = {}) =>
    Axios.post(`/${baseAPI}/create/project`, data, { params }),

  update: (data, slug, params = {}) =>
    Axios.post(`/${baseAPI}/${slug}/update`, data, { params }),

  destroy: (slug, params = {}) =>
    Axios.delete(`/${baseAPI}/${slug}/delete`, { params }),
};

export default {
  ...methods,
};
