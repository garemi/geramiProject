export default function (options = {}) {
  const storage = options.storage || (window && window.localStorage);
  const key = options.key || "vuex";

  function filter() {
    return true;
  }

  function setState(key, state, storage) {
    return storage.setItem(key, JSON.stringify(state));
  }

  function getState(key, storage) {
    const value = storage.getItem(key);

    try {
      return typeof value === "string"
        ? JSON.parse(value)
        : typeof value === "object"
        ? value
        : undefined;
    } catch (err) {}

    return undefined;
  }

  function setNestedProperty(obj, path, value) {
    const keys = path.split(".");
    const lastKeyIndex = keys.length - 1;
    let instance = { ...obj };

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!(key in instance)) {
        instance[key] = {};
      }
      instance = instance[key];
    }

    instance[keys[lastKeyIndex]] = value;

    return { ...obj, ...instance };
  }

  function getNestedProperty(obj, path) {
    const keys = path.split(".");
    let instance = { ...obj };
    for (let i = 0; i < keys.length; ++i) {
      const key = keys[i];
      if (!(key in instance)) {
        return undefined;
      }
      instance = instance[key];
    }
    return instance;
  }

  function mergeObjects(target, source, options = {}) {
    const arrayMerge = options.arrayMerge || ((store, saved) => saved);

    if (!isObject(target) || !isObject(source)) {
      return cloneObject(source);
    }

    const result = cloneObject(target);

    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(result, { [key]: cloneObject(source[key]) });
        } else {
          result[key] = mergeObjects(target[key], source[key], options);
        }
      } else if (Array.isArray(source[key])) {
        result[key] = arrayMerge(target[key], source[key]);
      } else {
        Object.assign(result, { [key]: source[key] });
      }
    });

    return result;
  }

  function isObject(value) {
    return value !== null && typeof value === "object";
  }

  function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function reducer(state, paths) {
    return Array.isArray(paths)
      ? paths.reduce(function (substate, path) {
          return setNestedProperty(
            substate,
            path,
            getNestedProperty(state, path),
          );
        }, {})
      : state;
  }

  // const assertStorage =
  //   options.assertStorage ||
  //   (() => {
  //     storage.setItem('@@', 1);
  //     storage.removeItem('@@');
  //   });

  // assertStorage(storage);

  const fetchSavedState = () => (options.getState || getState)(key, storage);

  let savedState;

  if (options.fetchBeforeUse) {
    savedState = fetchSavedState();
  }

  return function (store) {
    if (!options.fetchBeforeUse) {
      savedState = fetchSavedState();
    }

    if (typeof savedState === "object" && savedState !== null) {
      store.replaceState(
        options.overwrite
          ? savedState
          : mergeObjects(store.state, savedState, {
              arrayMerge:
                options.arrayMerger ||
                function (store, saved) {
                  return saved;
                },
            }),
      );
      (options.rehydrated || function () {})(store);
    }

    store.subscribe(function (mutation, state) {
      if (filter(mutation)) {
        setState(key, reducer(state, options.paths), storage);
      }
    });
  };
}
