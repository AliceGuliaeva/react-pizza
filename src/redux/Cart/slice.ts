import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItem, CartSliceState } from './types';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { CalculateTotalProducts } from '../../utils/calculateTotalProducts';
import { CalculateTotalPrice } from '../../utils/calculateTotalPrice';
const initialState: CartSliceState = {
  totalPrice: CalculateTotalPrice(getCartFromLS()),
  totalProducts: CalculateTotalProducts(getCartFromLS()),
  items: getCartFromLS(),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload });
      }
      state.totalPrice = CalculateTotalPrice(state.items);
      state.totalProducts = CalculateTotalProducts(state.items);
    },
    minusProduct(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        if (findItem.count === 1) {
          state.items = state.items.filter((obj) => obj.id !== action.payload);
        } else {
          findItem.count--;
        }
      }
      state.totalPrice = CalculateTotalPrice(state.items);
      state.totalProducts = CalculateTotalProducts(state.items);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = CalculateTotalPrice(state.items);
      state.totalProducts = CalculateTotalProducts(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalProducts = 0;
      state.totalPrice = CalculateTotalPrice(state.items);
      state.totalProducts = CalculateTotalProducts(state.items);
    },
  },
});

export const { addProduct, removeItem, clearItems, minusProduct } = cartSlice.actions;
export default cartSlice.reducer;
