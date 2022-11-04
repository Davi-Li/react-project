/*
 * @Author: webcc
 * @Date: 2022-10-27 21:17:58
 * @LastEditTime: 2022-11-04 20:10:54
 * @email: webcc.coder@qq.com
 */
import { createStore, applyMiddleware, AnyAction } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'
import { getTokenInfo } from '@/utils/token'
import { HomeAction } from './reducers/home'
import { ProfileAction } from './reducers/profile'
import { LoginAction } from './reducers/login'
import { SearchAction } from './reducers/search'

const store = createStore(reducer, {
    login: getTokenInfo()
}, composeWithDevTools(applyMiddleware(thunk)))

type RootAction = HomeAction | ProfileAction | LoginAction | SearchAction

// 获取RootState类型
export type RootState = ReturnType<typeof store.getState>
//指定action类型   
export type RootThunkAction = ThunkAction<Promise<void>, RootState, unknown, RootAction>

export default store