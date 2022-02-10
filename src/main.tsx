import React, { useEffect, useRef } from 'react';
import { Header } from '@components/header';
import { SpinComponent } from '@components/spin';
import { ContextMenu } from '@components/contextMenu';
import { Selection } from '@components/selection';
import { Msg } from '@components/message';
import { Modal } from '@components/modal';
import { BackgroundCanvas } from '@components/backgroundCanvas';
import { TopContext } from "@components/createContext";

import { BrowserRouter } from "react-router-dom";
import { SetRoutes } from './route/routes';

import css from '@style/main.module.css';

export const Main = () => {
  let contRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.onmousedown = (e: any) => {
      if (e.button === 1 || e.detail === 2) return false;
    };
  }, []);

  function goTop() {
    contRef.current?.scrollTo(0, 0);
  };

  return <div className={css.page}>
    <BrowserRouter>
      <div>
        <div className={css.box}>
          <Header />
          <div className={css.content} ref={contRef}>
            <TopContext.Provider value={goTop}>
              <SetRoutes />
            </TopContext.Provider>
          </div>
        </div>
        <ContextMenu />
        <Selection />
        <SpinComponent />
      </div>
      <BackgroundCanvas />
      <Msg />
      <Modal />
    </BrowserRouter>
  </div>;
};