const store = {
  storage: window.localStorage,
  name: 'localStorage',
  session: {
    name: 'sessionStorage',
    storage: window.sessionStorage,
  },
};

function serialize(val) {
  return JSON.stringify(val);
}

function deserialize(val) {
  try {
    return JSON.parse(val);
  } catch (e) {
    console.error(e);
    return val || undefined;
  }
}

const api = {
  setItem(key, val) {
    this.storage.setItem(key, serialize(val));
  },
  getItem(key) {
    return deserialize(this.storage.getItem(key));
  },
  removeItem(key) {
    this.storage.removeItem(key);
  },
  clear() {
    this.storage.clear();
  },
};

Object.assign(store, api);

Object.assign(store.session, api);

export default store;
