export const setDocumentHeight = () => {
  document.documentElement.style.setProperty(
    "--doc-height",
    `${window.innerHeight - 0.5}px`,
  );
};

export const setDocumentWidth = () => {
  document.documentElement.style.setProperty(
    "--doc-width",
    `${window.innerWidth}px`,
  );
};

export const copyText = (text) => {
  navigator.clipboard.writeText(text);
};

export const navigateTo = (url, target = "_blank") => {
  window.open(url, target);
};

export default {
  setDocumentHeight,
  setDocumentWidth,
  copyText,
  navigateTo,
};
