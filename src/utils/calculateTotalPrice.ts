import { CartItem } from '../redux/Cart/types';

export const CalculateTotalPrice = (state: CartItem[]) => {
  const totalPrice = state.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
  return totalPrice;
};
