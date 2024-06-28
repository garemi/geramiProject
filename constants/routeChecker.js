export const removeLastSlash = (routeUrl) =>
  routeUrl.length > 1 && routeUrl.slice(-1) == '/'
    ? routeUrl.slice(0, -1)
    : routeUrl;

export default {
  removeLastSlash,
};
