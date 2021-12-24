import React from 'react';
import { Edit } from '@/components/markdown/edit';
import Other from '@/page/other';
import css from '@/style/page/tools/markdown.module.css';

export default function MD_Edit(props: any) {
  
  return <div>
    <Other h1={props?.name.split('_').join(' ').toUpperCase()} />
    <div className={css.page}>
      <Edit />
    </div>
  </div>
};