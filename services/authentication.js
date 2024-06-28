import Axios from "@/constants/VianaAxios.js"; 
 
const baseAPI = "authentication"; 
 
const methods = { 
  getOTP: (data ,slug, params = {}) => 
    Axios.post(`/${baseAPI}/get/otp${slug ? `/${slug}` : ""}`, data, { params }), 
 
  verifyOTP: (data, params = {}) => 
    Axios.post(`/${baseAPI}/verify/otp`, data, { params }), 
 
  inquiry: (data, slug, params = {}) => 
    Axios.post(`/${baseAPI}/inquiry${slug ? `/${slug}` : ""}`, data, { params }), 

  setDocument: (data, slug, params = {}) => 
    Axios.post(`/${baseAPI}/set/document${slug ? `/${slug}` : ""}`, data, { params }), 

  setPostal: (data, slug, params = {}) => 
    Axios.post(`/${baseAPI}/set/postal${slug ? `/${slug}` : ""}`, data, { params }), 

  setVideo: (data, slug, params = {}) => 
    Axios.post(`/${baseAPI}/set/video${slug ? `/${slug}` : ""}`, data, { params }), 
 
  destroy: (slug, params = {}) => 
    Axios.delete(`/${baseAPI}/delete${slug ? `/${slug}` : ""}`, { params }), 
}; 
 
export default { 
  ...methods, 
}; 
