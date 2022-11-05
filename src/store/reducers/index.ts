/*
 * @Author: webcc
 * @Date: 2022-10-27 21:17:45
 * @LastEditTime: 2022-11-05 23:51:39
 * @email: webcc.coder@qq.com
 */
import login from './login'
import profile from './profile'
import home from './home'
import search from './search'
import article from './article'
import { combineReducers } from 'redux'

const reducers = combineReducers({
    login,
    profile,
    home,
    search,
    article
})

export default reducers