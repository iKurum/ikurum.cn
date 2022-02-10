import React from 'react';
import { Mdiv } from '@components/md';
import css from '@style/page/tools/css.module.css';
import Other from '../other';

export default function Css(props: any) {
  const list: any = [
    {
      id: 'css_test_1',
      use: `#css_test_1 {
  position: relative;
  padding-bottom: 4px;
}
#css_test_1::after{
  content: '';
  width: 90%;
  height: 0;
  position: absolute;
  left: 5%;
  bottom: 0;
  border-bottom: 1px solid #66ccff;
}`,
      cont: (css: any) => <span id={css.id}>
        <style>{css.use}</style>
        文字下划线
      </span>,
    },
    {
      id: 'css_test_2',
      use: `#css_test_2 {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
      cont: (css: any) => <div id={css.id}>
        <style>{css.use}</style>
        <p style={{ fontSize: '40px' }}>&#9995;</p>
        垂直居中
      </div>,
    },
    {
      id: 'css_test_3',
      use: `#css_test_3 {
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-right: none;
  border-bottom: 50px solid transparent;
  border-left: 100px solid red;
}`,
      cont: (css: any) => <div id={css.id}>
        <style>{css.use}</style>
      </div>,
    }
  ];

  return <div className={css.page}>
    <Other h1={props?.name.split('_').join(' ').toUpperCase()} />
    <div className={css.cont}>
      {list.map((item: any, index: number) => <div key={index} className={css['list-item']}>
        <div>
          <Mdiv data={"```css\r\n" + item.use + "\r\n```"} />
        </div>
        <div>{item.cont(item)}</div>
      </div>)}
    </div>
  </div>
};
