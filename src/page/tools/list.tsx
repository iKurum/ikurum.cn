import React, { useEffect, useState } from 'react';
import { Link, Routes, Route, useParams } from "react-router-dom";
import OCR_Text from './text';
import Css from './css';
import Format from './format';
import NotFound from '@/components/notFound';
import css from '@/style/page/tools/list.module.css';

function List() {
  const menu: any = [
    { name: '识别图片文字', url: '/tools/text_for_ocr/1240' },
    { name: '样式序列', url: '/tools/css_test/1251' },
    { name: '格式化JSON', url: '/tools/format_json/1263' },
  ];

  return <div className={css.stitle}>
    {menu.map((v: any, i: number) => <Link key={i} to={v.url}>
      <span key={i}>{v.name}</span>
    </Link>)}
  </div>
};

function Type() {
  let [dom, setDom] = useState<any>({ d: null });
  let { name, type } = useParams<any>();

  useEffect(() => {
    let D: (props: any) => JSX.Element;
    switch (Number(type)) {
      case 1240: D = OCR_Text; break;
      case 1251: D = Css; break;
      case 1263: D = Format; break;
      default: D = NotFound; break;
    }
    setDom({ d: D });
  }, [type]);

  return dom.d ? <dom.d name={name} /> : null;
};

export default function Tools() {
  return <div className={css.page}>
    <Routes>
      <Route path='/' element={<List />} />
      <Route path=':name/:type' element={<Type />} />
    </Routes>
  </div>
};