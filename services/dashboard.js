import Axios from "@/constants/VianaAxios.js";

const baseAPI = "dashboard";

const methods = {
  getAdmin: (params = {}) => Axios.get(`/admin/${baseAPI}`, { params }),
};

export default {
  ...methods,
};
