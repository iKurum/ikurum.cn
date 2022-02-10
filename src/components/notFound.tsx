import React from 'react';
import css from '@style/components/notFound404.module.css';

export default function NotFound(props: any) {
  return <div className={css.page}>
    <svg className={['icon', css.icon404].join(' ')} aria-hidden='true'>
      <use href='#icon-153error40402'></use>
    </svg>
  </div>
}