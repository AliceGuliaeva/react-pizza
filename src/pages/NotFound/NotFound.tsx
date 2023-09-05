import React from 'react';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.root}>
      <span className={styles.smile}>😕</span>
      <br />
      <h1>Ничего не найдено</h1>
    </div>
  );
};
export default NotFound;
