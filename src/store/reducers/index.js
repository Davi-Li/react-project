/*
 * @Author: webcc
 * @Date: 2022-10-27 21:17:45
 * @LastEditTime: 2022-10-31 19:43:32
 * @email: webcc.coder@qq.com
 */
import login from './login'
import profile from './profile'
import home from './home'

const { combineReducers } = require('redux')

const reducers = combineReducers({
    login,
    profile,
    home
})

export default reducers