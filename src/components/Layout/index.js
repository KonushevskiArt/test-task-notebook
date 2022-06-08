import React from 'react';
import s from './style.module.scss';

const Layout = ({children}) => {
  return (
    <div className={s.container}>
      <div className={s.content}>{children}</div>
    </div>
  );
};

export default Layout;