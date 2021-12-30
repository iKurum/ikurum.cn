import React, { useEffect, useState } from 'react';
import port from "@/axios/service";
import { Link } from 'react-router-dom';
import css from '@/style/components/header.module.css';
import { autoMenu } from '@/config';
import { useQuery } from '@/route/getSearch';
import methods from '@/common/methosd';

export const Header = () => {
  const isGoSite = window.location.href.indexOf('other_site') !== -1 && !!useQuery('target');

  const [imageURL, setImageURL] = useState('');
  const [activeMenu, setActiveMenu] = useState(false);
  const [info, setInfo] = useState<{ name: string, email: string }>({ name: '', email: '' });

  const menu: any = [
    { name: '随笔小记', url: '/article' },
    { name: 'Kms', url: '/other/kms' },
    { name: 'V2ray', url: '/other/v2ray' },
    { name: '在线工具', url: '/tools' },
  ];
  console.log('h',);

  useEffect(() => {
    if (!isGoSite) {
      port.photo({}, { spin: 1 }).then((res: any) => {
        setImageURL(res && res.data ? `data:image/png;base64,${res.data}` : '');
      });

      if (methods.getSession('info')) {
        setInfo(methods.getSession('info'));
      } else {
        port.userInfo().then((res: any) => {
          setInfo(res?.data)
          methods.setSession('info', res?.data)
        });
      }

      if (document.body.clientWidth > 500 && autoMenu) {
        setActiveMenu(true);
      }
    }
  }, []);

  return isGoSite ? null : <div className={css.page} style={{
    width: activeMenu ? '200px' : 0,
    minWidth: activeMenu ? '200px' : 0,
    position: document.body.clientWidth > 600 ? 'relative' : 'absolute',
  }}>
    <span onClick={() => { setActiveMenu(!activeMenu) }}>
      <svg
        className={['icon', activeMenu ? css.active : css.noactive].join(' ')}
        aria-hidden='true'
      >
        <use href='#icon-ai203'></use>
      </svg>
    </span>
    <Link to='/'>
      <div className={css.photo} style={{ backgroundImage: `url(${imageURL})` }} />
    </Link>
    <p>{info?.name}</p>
    <p><a href={`mailto:${info?.email}`}>{info?.email}</a></p>
    <ul>
      {menu.map((item: any, i: number) => <li key={i}>
        <Link to={item.url}>
          <span>{item.name}</span>
          <span>{item.name}</span>
        </Link>
      </li>)}
    </ul>
    <div className={css.footer}>
      <p onClick={() => { window.location.href = 'https://github.com/iKurum' }}>
        <svg className='icon' aria-hidden='true'>
          <use href='#icon-github1'></use>
        </svg>
        <span>github/iKurum</span>
      </p>
    </div>
  </div>;
}