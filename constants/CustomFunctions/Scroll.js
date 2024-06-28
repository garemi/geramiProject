export const scrollToElement = (name, refs) => {
  setTimeout(() => {
    if (name in refs) {
      if (refs[name].$el) refs[name].$el.scrollIntoView({ behavior: "smooth" });
      else refs[name].scrollIntoView({ behavior: "smooth" });
    }
  }, 200);
};

export default {
  scrollToElement,
};
