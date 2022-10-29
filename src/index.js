/*
 * @Author: webcc
 * @Date: 2022-10-26 19:21:45
 * @LastEditTime: 2022-10-27 21:25:40
 * @email: webcc.coder@qq.com
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from '@/store'
import { Provider } from 'react-redux'
// import './assets/styles/index.scss'
import '@scss/index.scss';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))

