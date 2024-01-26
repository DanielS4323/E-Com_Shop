export const baseURL = 'https://dummyjson.com';
const products = 'products';
const categories = 'categories';
const category = 'category';
const search = 'search?q=';

export const getAllProducts = async ({ pageParam }) => {
  return await fetch(`${baseURL}/${products}?limit=${pageParam}`).then(
    (response) => response.json(),
  );
};

export const getSingleProduct = async (pageParam) => {
  return await fetch(`${baseURL}/${products}/${pageParam}`).then((response) =>
    response.json(),
  );
};

export const searchProducts = async ({ queryKey }) => {
  return await fetch(`${baseURL}/${products}/${search}${queryKey}`).then(
    (response) => response.json(),
  );
};

export const getAllCategories = async () => {
  return await fetch(`${baseURL}/${products}/${categories}`).then((response) =>
    response.json(),
  );
};

export const getCategory = async (categoryParam) => {
  return await fetch(
    `${baseURL}/${products}/${category}/${categoryParam}`,
  ).then((response) => {
    response.json();
  });
};
