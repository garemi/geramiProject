export default (context, inject) => {
  inject("localeProps", context.i18n.localeProperties);
  inject("isRTL", () => context.i18n.localeProperties?.dir === "rtl");
};
