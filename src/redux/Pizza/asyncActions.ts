import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchPizzaArgs, Item } from './types';
export const fetchPizzas = createAsyncThunk<Item[], FetchPizzaArgs>(
  'pizza/fetchPizzaStatus',
  async (params) => {
    const { currentPage, categoryId, searchValue, activeSort } = params;
    const { data } = await axios.get<Item[]>(
      `https://6497cf249543ce0f49e16d06.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId === 0 ? '' : `category=${categoryId}`
      }${
        searchValue === '' ? '' : `search=${searchValue}`
      }&sortBy=${activeSort.sortProperty.replace('-', '')}&order=${
        activeSort.sortProperty.includes('-') ? 'asc' : 'desc'
      }`,
    );
    return data;
  },
);
