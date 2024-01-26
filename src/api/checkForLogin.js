import { baseURL } from './products';

const checkForLogIn = async (token) => {
  return fetch(`${baseURL}/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(console.log('check fired'))
    .then((res) => res.json())
    .catch((err) => err);
};

export default checkForLogIn;
