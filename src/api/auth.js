import { baseURL } from './products';

const logInFunction = async (username, password) => {
  return await fetch(`${baseURL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export default logInFunction;
