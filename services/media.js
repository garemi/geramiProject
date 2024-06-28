import Axios from "@/constants/VianaAxios.js"; 
 
const baseAPI = "media"; 
 
const methods = { 
  get: (slug, params = {}) => 
    Axios.get(`/${baseAPI}/index${slug ? `/${slug}` : ""}`, { params }), 
 
  create: (data, params = {}) => 
    Axios.post(`/${baseAPI}/create`, data, { params }), 
 
  update: (data, slug, params = {}) => 
    Axios.post(`/${baseAPI}/${slug}/update`, data, { params }), 
 
  destroy: (slug, params = {}) => 
    Axios.delete(`/${baseAPI}/${slug}/delete`, { params }),
    
    upload : (file, params = {}) => {
      let data = new FormData();
      data.append("filepond", file);
      return Axios.post(`/${baseAPI}/upload`, data, { params });
    }
}; 

 
export default { 
  ...methods, 
}; 
