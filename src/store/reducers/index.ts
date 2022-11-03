/*
 * @Author: webcc
 * @Date: 2022-10-27 21:17:45
 * @LastEditTime: 2022-11-04 00:16:14
 * @email: webcc.coder@qq.com
 */
import login from './login'
import profile from './profile'
import home from './home'
import { combineReducers } from 'redux'

const reducers = combineReducers({
    login,
    profile,
    home
})

export default reducers