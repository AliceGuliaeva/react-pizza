export type CartItem = {
  id: string;
  title: string;
  imgUrl: string;
  price: number;
  type: string;
  size: number;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  totalProducts: number;
  items: CartItem[];
}
