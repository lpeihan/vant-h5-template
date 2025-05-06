export const isPhoneNumber = (val) => {
  return /^1[0-9]{10}$/.test(val);
};
