export const checkResStatus = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return res.text().then((text) => {
    return Promise.reject(JSON.parse(text));
  });
};
