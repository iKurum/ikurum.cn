import React from 'react';
import { Routes, Route } from "react-router-dom";
import NotFound from '@components/notFound';
import List from '@/page/article/list';
import Home from '@/page/home';
import Other from '@/page/other';
import Tool from '@/page/tools/list';
import OtherSite from '@/page/other_site';

export function SetRoutes() {
  return <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/article/*' element={<List />} />
    <Route path='/other/:name' element={<Other />} />
    <Route path='/tools/*' element={<Tool />} />
    <Route path='/other_site' element={<OtherSite />} />
    <Route path='*' element={<NotFound />} />
  </Routes>;
}