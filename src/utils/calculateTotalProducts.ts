import { CartItem } from '../redux/Cart/types';

export const CalculateTotalProducts = (state: CartItem[]) => {
  const totalProducts = state.reduce((sum, obj) => {
    return obj.count + sum;
  }, 0);
  return totalProducts;
};
