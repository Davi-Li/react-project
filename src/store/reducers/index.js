/*
 * @Author: webcc
 * @Date: 2022-10-27 21:17:45
 * @LastEditTime: 2022-10-29 14:09:38
 * @email: webcc.coder@qq.com
 */
import login from './login'
const { combineReducers } = require('redux')

const reducers = combineReducers({
    login
})

export default reducers