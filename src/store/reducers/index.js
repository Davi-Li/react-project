/*
 * @Author: webcc
 * @Date: 2022-10-27 21:17:45
 * @LastEditTime: 2022-10-29 22:04:17
 * @email: webcc.coder@qq.com
 */
import login from './login'
import profile from './profile'
const { combineReducers } = require('redux')

const reducers = combineReducers({
    login,
    profile
})

export default reducers