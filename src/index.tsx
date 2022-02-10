import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from '@/main';
import { setApi } from '@/axios/apis';
import { setNumberPrototype } from '@common/setNumber';

console.log('初始化Api');
setApi();
setNumberPrototype();

ReactDOM.render(<Main />, document.getElementById('root'));
