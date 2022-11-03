/*
 * @Author: webcc
 * @Date: 2022-10-27 21:17:58
 * @LastEditTime: 2022-10-29 14:22:35
 * @email: webcc.coder@qq.com
 */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'
import { getTokenInfo } from '@/utils/token'

const store = createStore(reducer, {
    login: getTokenInfo()
}, composeWithDevTools(applyMiddleware(thunk)))

export default store