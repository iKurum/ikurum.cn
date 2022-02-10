import React, { useEffect, useRef, useState } from 'react';
import css from '@style/components/contextMenu.module.css';

export const ContextMenu = () => {
  let [isA, setIsA] = useState(false);
  let menuRef = useRef<HTMLDivElement>(null);
  let wdRef = useRef<string | null>(null);

  interface menuList {
    name: string;
    method: () => any;
  }

  let menu: menuList[] = [{
    name: '返回主页', method: () => {
      window.location.href = window.location.origin;
    }
  }, {
    name: '刷新', method: () => {
      window.history.go(0)
    }
  }, {
    name: '访问网址', method: () => {
      let tempWindow = window.open('_blank');
      if (tempWindow?.location) {
        tempWindow.location.href = wdRef.current || '';
      }
    }
  }, {
    name: '前往资源库', method: () => {
      let tempWindow = window.open('_blank');
      if (tempWindow?.location) {
        tempWindow.location.href = 'https://drive.ikurum.cn';
      }
    }
  },
    // {
    //   name: '前往v2站', method: () => {
    //     let tempWindow = window.open('_blank');
    //     if (tempWindow?.location) {
    //       tempWindow.location.href = 'https://v2.ikurum.cn';
    //     }
    //   }
    // }
  ];

  useEffect(() => {
    document.body.oncontextmenu = e => {
      e = e || Event;
      e.preventDefault();

      if (e.target && (e.target as HTMLDivElement).nodeName === 'A') {
        wdRef.current = (e.target as HTMLDivElement).getAttribute('href');
        setIsA(true);
      } else {
        setIsA(false);
      }

      const x: number = e.pageX;
      const y: number = e.pageY;
      const ch: number = document.body.clientHeight;
      const cw: number = document.body.clientWidth;

      if (menuRef.current) {
        menuRef.current.style.display = 'flex';
        menuRef.current.style.left = cw - x > 100 ? `${x + 2}px` : `${x - 102}px`;
        menuRef.current.style.top = ch - y > 197 ? `${y + 2}px` : `${y - (isA ? 197 : 158)}px`;
      }
    }

    // 鼠标点击其他位置时隐藏菜单
    document.onclick = function () {
      if (menuRef.current && menuRef.current.style.display !== 'none') {
        menuRef.current.style.display = 'none';
        menuRef.current.style.left = '0';
        menuRef.current.style.top = '0';
      }
    }
  }, [isA]);

  return (
    // <div className={css.page} ref={menuRef} style={{ height: !!isA ? '197px' : '158px' }}>
    <div className={css.page} ref={menuRef} style={{ height: !!isA ? '158px' : '119px' }}>
      <ul>
        {menu.map((v: menuList, i: number) => !isA && v.name === '访问网址' ? null : <li key={i} onClick={v.method}>{v.name}</li>)}
      </ul>
    </div>
  )
}