const SetValueLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
const GetValueLocalStorage = (key: string) => {
  const infoData = localStorage.getItem(key);
  if (infoData) {
    return JSON.parse(infoData);
  }
  return null;
};

const ClearValueLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

const GetValueToken = (key: string) => {
  const token = localStorage.getItem(key);
  if (token) {
    return JSON.parse(token);
  }
  return null;
};

const SetValueToken = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const ClearValueToken = (key: string) => {
  localStorage.removeItem(key);
};
export {
  SetValueLocalStorage,
  GetValueToken,
  ClearValueToken,
  GetValueLocalStorage,
  SetValueToken,
  ClearValueLocalStorage,
};
