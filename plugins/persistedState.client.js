import createPersistedState from "@/constants/persistence";
import Constants from "@/constants/GlobalConstants";

export default ({ store, req }) => {
  createPersistedState({
    key: Constants.storeKey,
    paths: ["token", "userData", "userNotifications", "showIntro"],
  })(store);
};
