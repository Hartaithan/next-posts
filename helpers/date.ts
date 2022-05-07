export const fullDate = (date: string) => {
  return new Date(date).toLocaleString();
};

export const onlyDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

export const onlyTime = (date: string) => {
  return new Date(date).toLocaleTimeString();
};
