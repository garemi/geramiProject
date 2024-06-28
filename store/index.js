import Constants from "@/constants/GlobalConstants";
import VianaAxios from "@/constants/VianaAxios";
import services from "@/services";

// NOTE: add every variables which you want to store in localstorage in "plugins/persistedState.client.js"

export const plugins = [];

export const state = () => ({
  token: null,
  userData: null,
  userNotifications: [],
  cities: [],
  gotSettings: false,
  showIntro: true,

  share: {
    visible: false,
    text: "",
    url: "",
  },
});

export const mutations = {
  setSettings(state, settings) {
    state.gotSettings = true;
    settings.forEach((item) => {
      state.settings[item.key] = item.value;
    });
  },
  setWallet(state, wallet) {
    state.userData = {
      ...state.userData,
      wallet,
    };
  },
  setToken(state, newToken) {
    state.token = newToken;
  },
  showIntro(state, newToken) {
    state.showIntro = false;
  },
  setUserData(state, userData) {
    state.userData = userData;
  },
  setUserDataWithToken(state, userData, token) {
    state.userData = userData;
    state.token = token;
  },
  setUserNotification(state, userNotifications) {
    state.userNotifications = userNotifications;
  },
  setShareMetaData(state, { visible, text, url }) {
    state.share = {
      visible,
      text: text ?? "",
      url: url ?? "",
    };
  },
  exit(state) {
    localStorage.removeItem(Constants.storeKey);
    VianaAxios.defaults.headers.common["Authorization"] = "";
    state.token = null;
    state.userData = null;
    state.userNotifications = [];
  },
  updateUser(state, data) {
    state.userData = {
      ...state.userData,
      ...data,
    };
  },
};

export const actions = {
  getNotification(store) {
    if (!store.state.userData) return;

    services.user
      .notifications(null, {
        noPaginate: true,
      })
      .then((response) => {
        store.commit("setUserNotification", response.data.notifications);

        store.commit("setWallet", response.data.wallet || 0);
      })
      .catch((error) => {
        console.log("error in get notifications", error);
      });
  },
};
