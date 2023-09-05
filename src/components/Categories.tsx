import React from 'react';
type CategoriesProps = {
  activeCategory: number;
  onClickCategory: (index: number) => void;
};
const Categories: React.FC<CategoriesProps> = React.memo(({ activeCategory, onClickCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={category}
            onClick={() => onClickCategory(index)}
            className={activeCategory === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
});
export default Categories;
