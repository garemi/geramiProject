export const isValidFile = (file, supportedFormats) => {
  const { size, type } = file;

  const hasSupportedType = supportedFormats.indexOf(type) > -1;

  const isValid = hasSupportedType && size <= sizeLimit;
  return isValid;
};

export const readFileAsync = (file, method = "readAsArrayBuffer") =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader[method](file);
  });

export default {
  readFileAsync,
};
