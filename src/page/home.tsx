import React, { useEffect, useState } from 'react';
import css from '@/style/page/home.module.css';
import { Calendar } from '@/components/calendar';
import port from "@/axios/service";

export default function Home() {
  let [h, setH] = useState<String>('');

  const getH = () => {
    port.one().then((res: any) => {
      setH(res?.data)
    })
  };

  useEffect(() => { getH() }, []);

  return <div className={h && css.page}>
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      width: '330px',
    }}><Calendar /></div>
    <h1 onClick={getH}>{h}</h1>
  </div>
};