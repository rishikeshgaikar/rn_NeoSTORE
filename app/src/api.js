const api = (url, fetchConfig) => {
  const endurl = url.trim();
  return fetch(
    `http://staging.php-dev.in:8844/trainingapp/api/${endurl}`,
    fetchConfig
  ).then(res => res.json());
};
export { api };
