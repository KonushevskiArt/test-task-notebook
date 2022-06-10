import React from 'react';
import styles from './style.module.scss'

const Spinner = () => {
  return (
    <div className='button-loading'>
      <div className={`${styles['spinner']} ${styles['spinner-1']}`}></div>
    </div>
  );
};

export default Spinner;

