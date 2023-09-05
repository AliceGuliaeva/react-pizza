import Pizza_block from '../components/PizzaBlock';
import Categories from '../components/Categories';
import { useCallback, useEffect, useRef } from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import { setCategoryId, setPage, setFilters } from '../redux/Filter/slice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import SortPopup, { sortList } from '../components/SortPopup';
import { fetchPizzas } from '../redux/Pizza/asyncActions';
import NotFound from './NotFound/NotFound';
import { RootState, useAppDispatch } from '../redux/store';
import { FilterSliceState } from '../redux/Filter/types';

type PizzaItem = {
  id: string;
  title: string;
  imgUrl: string;
  price: number;
  types: number[];
  sizes: number[];
  count: number;
};
export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const mas = [...new Array(6)];
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector((state: RootState) => state.pizza);
  const { categoryId, currentPage, searchValue, activeSort } = useSelector(
    (state: RootState) => state.filter,
  );

  const getPizzas = async () => {
    dispatch(fetchPizzas({ currentPage, categoryId, searchValue, activeSort }));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const activeSort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      if (activeSort) {
        dispatch(setFilters({ ...params, activeSort } as FilterSliceState));
      }
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    window.scrollTo(0, 0);
    isSearch.current = false;
  }, [categoryId, activeSort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: activeSort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, activeSort.sortProperty, currentPage]);

  const onClickCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);
  const changeCurrentPage = (number: number) => {
    dispatch(setPage(number));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={categoryId}
          onClickCategory={(index) => onClickCategory(index)}
        />
        <SortPopup />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <NotFound />
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? mas.map((arr, index) => <Skeleton key={index} />)
            : items.map((obj: PizzaItem) => <Pizza_block {...obj} key={obj.id} />)}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        onChangePage={(number: number) => changeCurrentPage(number)}
      />
    </div>
  );
}
