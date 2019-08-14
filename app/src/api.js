import AsyncStorage from '@react-native-community/async-storage';
export default async function api(url, m, b) {
  const token = await AsyncStorage.getItem('@NeoSTORE_at');
  const endurl = url.trim();
  var body_value = null;
  if (b != null) {
    body_value = b.trim();
  }
  const fetchConfig = {
    method: m,
    headers: {
      access_token: token,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body_value
  };
  // console.log(endurl, fetchConfig);
  const res = await fetch(
    `http://staging.php-dev.in:8844/trainingapp/api/${endurl}`,
    fetchConfig
  );
  return await res.json();
}
