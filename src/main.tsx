import React, { useEffect, useRef } from 'react';
import { Header } from '@/components/header';
import { SpinComponent } from '@/components/spin';
import { ContextMenu } from '@/components/contextMenu';
import { Selection } from '@/components/selection';
import { Msg } from '@/components/message';
import { Modal } from '@/components/modal';
import { BackgroundCanvas } from '@/components/backgroundCanvas';
import { TopContext } from "@/components/createContext";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import NotFound from '@/components/notFound';

import List from '@/page/article/list';
import Home from '@/page/home';
import Other from '@/page/other';
import Tool from '@/page/tools/list';

import css from '@/style/main.module.css';

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
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/article/*' element={<List />} />
                <Route path='/other/:name' element={<Other md={null} h1={null} />} />
                <Route path='/tools/*' element={<Tool />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
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