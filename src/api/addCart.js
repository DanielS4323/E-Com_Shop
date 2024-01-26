import { baseURL } from './products';

const postCart = async (cart) => {
  return await fetch(`${baseURL}/carts/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: 1,
      products: cart,
    }),
  }).then((res) => console.log(res.json()));
};
export default postCart;
