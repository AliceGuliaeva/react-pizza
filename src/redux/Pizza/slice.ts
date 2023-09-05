import { createSlice } from '@reduxjs/toolkit';
import { PizzaSliceState } from './types';
import { fetchPizzas } from './asyncActions';

const initialState: PizzaSliceState = {
  items: [],
  status: '',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.items = [];
      state.status = 'loading';
    }),
      builder.addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      }),
      builder.addCase(fetchPizzas.rejected, (state, action) => {
        state.items = [];
        state.status = 'error';
      });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
