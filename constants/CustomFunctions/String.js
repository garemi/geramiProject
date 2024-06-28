export const filterNumber = (t) => {
  if (!t) return "";
  t += "";
  if (t.includes(",")) t = t.split(",").join("");
  if (!/^\d+$/.test(t)) {
    return t;
  }
  return "" + Intl.NumberFormat().format(+t);
};

export const makeSlug = (text) => text.replace(/\/|\s|\./g, "-").toLowerCase();

export const removeLastSlash = (routeUrl) =>
  routeUrl.length > 1 && routeUrl.slice(-1) == "/"
    ? routeUrl.slice(0, -1)
    : routeUrl;

export const toEnglishNumber = (value) => {
  if (!value?.length) return "";

  const persian = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return (value + "").replace(/[۰-۹]/g, (chr) => {
    const idx = persian.indexOf(chr);
    return idx >= 0 ? idx : chr;
  });
};

export default {
  filterNumber,
  makeSlug,
  removeLastSlash,
  toEnglishNumber,
};
