export type FetchPizzaArgs = {
  currentPage: number;
  categoryId: number;
  searchValue: string;
  activeSort: { sortProperty: string };
};
export type Item = {
  id: string;
  title: string;
  imgUrl: string;
  price: number;
  types: number[];
  sizes: number[];
  count: number;
};
export interface PizzaSliceState {
  items: Item[];
  status: string;
}
