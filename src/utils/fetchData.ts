export const getRequestUrl = (path: string) => {
  return `${process.env.REACT_APP_BACKEND_BASE_URL}/${path}`
};

export const fetchData = async (path: string) => {
  const requestUrl = getRequestUrl(path);
  const res = await fetch(requestUrl);
  const data = await res.json();
  return data;
}
