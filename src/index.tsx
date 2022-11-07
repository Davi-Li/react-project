/*
 * @Author: webcc
 * @Date: 2022-10-26 19:21:45
 * @LastEditTime: 2022-11-06 13:03:29
 * @email: webcc.coder@qq.com
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from '@/store'
import { Provider } from 'react-redux'
// import './assets/styles/index.scss'
import '@scss/index.scss';
// 导入dayjs插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 引入dayjs国际化
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))

