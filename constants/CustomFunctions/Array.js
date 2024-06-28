export function groupBy(array, key) {
  return array.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

export function setNestedProperty(obj, path, value) {
  const keys = path.split(".");
  let currentObj = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!currentObj?.hasOwnProperty(key)) {
      currentObj[key] = {};
    }
    currentObj = currentObj[key];
  }
  currentObj[keys[keys.length - 1]] = value;
}

export function getNestedProperty(obj, path) {
  const keys = path.split(".");
  let currentObj = obj;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!currentObj?.hasOwnProperty(key)) {
      return undefined;
    }
    currentObj = currentObj[key];
  }
  return currentObj;
}

export default {
  groupBy,
  setNestedProperty,
  getNestedProperty,
};
