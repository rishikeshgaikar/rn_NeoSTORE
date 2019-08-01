const api = (url, m, at, b) => {
  const endurl = url.trim();
  var w = null;
  if (b != null) {
    w = b.trim();
  }
  const fetchConfig = {
    method: m,
    headers: {
      access_token: at,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: w
  };
  console.log(endurl, fetchConfig);
  return fetch(
    `http://staging.php-dev.in:8844/trainingapp/api/${endurl}`,
    fetchConfig
  ).then(res => res.json());
};

export { api };
