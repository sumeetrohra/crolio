export const verifyName = (name: string) => {
  const re = /^[a-zA-Z]+$/;
  return re.test(name);
};
