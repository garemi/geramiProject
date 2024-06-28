import Axios from "axios";
import { Constants } from "./GlobalConstants";
import services from "@/services";

import { store } from "@/plugins/store.client";
import { errors } from "@/constants/messages";

const VianaAxios = Axios.create({
  baseURL: Constants.mainURL_fa,
  timeout: 60000,
});

VianaAxios.interceptors.request.use(
  function (config) {
    const storageToken =
      typeof window !== "undefined" ? localStorage?.getItem("token") : null;
    if (storageToken && !config?.headers?.Authorization) {
      let parsedToken = JSON.parse(storageToken);
      config.headers.Authorization = `Bearer ${parsedToken.access_token}`;
    } else if (config?.headers?.Authorization && !storageToken) {
      config.headers.Authorization = "";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

VianaAxios.interceptors.response.use(
  (response) => {
    console.log(response.config.url, response.data.data || response.data);
    return response;
  },
  (error) => {
    console.log(error, error?.response || "");
    if (!Axios.isCancel(error)) {
      if (error?.response?.status === 401) {
        let storageToken = localStorage.getItem("token");
        storageToken = JSON.parse(storageToken);

        if (!VianaAxios.defaults.headers.common["Authorization"]) {
          VianaAxios.defaults.headers.common["Authorization"] =
            "Bearer " + storageToken.access_token;

          error.config.headers.Authorization =
            "Bearer " + storageToken.access_token;

          return VianaAxios.request(error.config);
        } else {
          // store.commit("exit");
          // window.location.replace("//" + window.location.host);
          // return services.auth
          //   .refreshToken(storageToken)
          //   .then((token) => {
          //     localStorage.removeItem("token");
          //     localStorage.setItem("token", JSON.stringify(token));
          //     console.log(token);
          //     store.commit("setToken", token);
          //     VianaAxios.defaults.headers.common["Authorization"] =
          //       "Bearer " + token.access_token;
          //     error.config.headers.Authorization =
          //       "Bearer " + token.access_token;
          //     console.warn(error.config);
          //     return VianaAxios.request(error.config);
          //   })
          //   .catch((tokenerror) => {
          //     return Promise.reject(tokenerror);
          //   });
        }
      } else {
        console.log(error);
      }
    }

    console.warn("error accured!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    return Promise.reject(error);
  },
);

export const getErrorText = (error) =>
  (error.response?.status && errors[error.response?.status] != undefined) ||
  (typeof error == "number" && errors[error] != undefined)
    ? errors[error?.response?.status || error]
    : error.response?.data?.length
    ? error.response.data[0]
    : error?.response?.data?.message ??
      error.response?.data?.msg ??
      error?.response?.msg ??
      error?.response?.data ??
      error?.response ??
      error ??
      "مشکلی پیش آمده لطفا مجدد تلاش کنید";

export default VianaAxios;
