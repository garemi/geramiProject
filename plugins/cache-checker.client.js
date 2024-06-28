import { Constants } from "@/constants/GlobalConstants";

const currentVersion = require("../package.json").version;

export default () => {
  const cacheVersion = localStorage.getItem(`${Constants.storeKey}-version`);

  // CAUTION: Only works for https websites
  if (cacheVersion !== currentVersion) {
    if (typeof caches != "undefined") {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((name) => {
          caches.delete(name);
        });
      });
    }

    localStorage.setItem(`${Constants.storeKey}-version`, currentVersion);

    window.location.replace(window.location.href);
  }
};
