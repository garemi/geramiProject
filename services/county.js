import Axios from "@/constants/VianaAxios.js"; 
 
const baseAPI = "counties"; 
 
const methods = { 
  get: (slug, params = {}) => 
    Axios.get(`/${baseAPI}/index${slug ? `/${slug}` : ""}`, { params }), 
 
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
