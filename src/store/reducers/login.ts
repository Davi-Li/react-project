import { LOGOUT, TOKEN } from "../action_types/login"

/*
 * @Author: webcc
 * @Date: 2022-10-29 14:06:35
 * @LastEditTime: 2022-11-04 00:23:11
 * @email: webcc.coder@qq.com
 */

type Token = {
    token: string,
    refresh_token: string
}

type ActionType = {
    type: 'login/token' | 'login/logout',
    payload: Token
}

let initialValus: Token = {
    token: "",
    refresh_token: "",
}
export default function login(state = initialValus, action: ActionType) {
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