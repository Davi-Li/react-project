/*
 * @Author: webcc
 * @Date: 2022-10-27 21:17:58
 * @LastEditTime: 2022-11-04 16:23:14
 * @email: webcc.coder@qq.com
 */
import { createStore, applyMiddleware, AnyAction } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'
import { getTokenInfo } from '@/utils/token'

const store = createStore(reducer, {
    login: getTokenInfo()
}, composeWithDevTools(applyMiddleware(thunk)))

// 获取RootState类型
export type RootState = ReturnType<typeof store.getState>
//指定action类型   
export type RootThunkAction = ThunkAction<Promise<void>, RootState, unknown, AnyAction>

export default store