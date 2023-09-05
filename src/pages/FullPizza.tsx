import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState<{
    imgUrl: string;
    title: string;
    price: number;
  }>();
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://6497cf249543ce0f49e16d06.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при открытии пиццы');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);
  if (!pizza) {
    return <>Загрузка...</>;
  }
  return (
    <div className="container">
      <img src={pizza.imgUrl} alt="" />
      <h2>{pizza.title}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam eos reiciendis, culpa
        consectetur, cum eius illum laudantium voluptate dolore ducimus aperiam quasi ipsum quidem
        sapiente, incidunt nisi maiores? Aperiam, ut.
      </p>
      <p>{pizza.price} ₽</p>
    </div>
  );
};

export default FullPizza;
