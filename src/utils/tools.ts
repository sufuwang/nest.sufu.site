export const getOneFromSession = (cookie: string, key: string) => {
  if (!cookie.includes(key)) {
    return '';
  }
  const item = cookie.split(',').find((i) => i.includes(key));
  return item.split('=')[1];
};
