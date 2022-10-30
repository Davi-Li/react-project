import { LOGOUT, TOKEN } from "../action_types/login"

/*
 * @Author: webcc
 * @Date: 2022-10-29 14:06:35
 * @LastEditTime: 2022-10-30 18:17:28
 * @email: webcc.coder@qq.com
 */
let initialValus = {
    token: "",
    refresh_token: "",
}
export default function login(state = initialValus, action) {
    let { type, payload } = action
    if (type == TOKEN) {
        return payload
    }
    if (type == LOGOUT) {
        return {
            token: "",
            refresh_token: "",
        }
    }
    return state
}