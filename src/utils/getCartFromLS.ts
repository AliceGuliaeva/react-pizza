export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const json = data ? JSON.parse(data) : [];
  return json;
};
