import React, { useEffect, useRef, useState } from 'react';
import css from '@style/components/message.module.css';

let o: any, d: any;
export const Msg = () => {
  let [data, setData] = useState<any>(null);
  let [show, setShow] = useState<boolean>(false);
  let timer = useRef<any>(null);
  const cl: any = {
    info: { s: '#icon-right-circle', c: '#66ccff' },
    success: { s: '#icon-success', c: '#6dee09' },
    warning: { s: '#icon-info', c: '#f4ea2a' },
    error: { s: '#icon-guanbi', c: '#d81e06' },
  };

  d = function destroyed() {
    setShow(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  o = function openM(type: string, msg: string | null) {
    setData({
      m: msg,
      s: cl[type] ? cl[type]['s'] : '#icon-right-circle',
      c: cl[type] ? cl[type]['c'] : '#66ccff',
    });
    setShow(true);
  };

  useEffect(() => {
    if (data) {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setShow(false);
        clearTimeout(timer.current);
      }, 3000);
    }

    return () => {
      if (timer.current) clearTimeout(timer.current)
      timer.current = null;
    }
  }, [data]);

  useEffect(() => {
    if (!show) {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setData(null);
        clearTimeout(timer.current);
      }, 1000);
    }

    return () => {
      if (timer.current) clearTimeout(timer.current)
      timer.current = null;
    }
  }, [show]);

  return data ? <div className={css.page}>
    <div
      className={[css.no_msg, show ? css.msg : null].join(' ')}
      style={{
        border: `1px solid ${data?.c}`,
        borderLeft: `3px solid ${data?.c}`
      }}
    >
      <svg className='icon' aria-hidden='true' style={{
        fontSize: '12px',
        marginRight: '10px',
      }}>
        <use href={data?.s}></use>
      </svg>
      {data?.m}
    </div>
  </div> : null
};


export function openMsg(type: string, msg: string | null) {
  if (o) o(type, msg);
};

export function destroyedMsg() {
  if (d) d();
};