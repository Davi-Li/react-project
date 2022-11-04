/*
 * @Author: webcc
 * @Date: 2022-10-29 14:06:35
 * @LastEditTime: 2022-11-04 16:43:48
 * @email: webcc.coder@qq.com
 */

type Token = {
    token: string,
    refresh_token: string
}

export type LoginAction = {
    type: 'login/token' | 'login/logout',
    payload: Token
}

let initialValus: Token = {
    token: "",
    refresh_token: "",
}
export default function login(state = initialValus, action: LoginAction) {
    let { type, payload } = action
    if (type == 'login/token') {
        return payload
    }
    if (type == 'login/logout') {
        return {
            token: "",
            refresh_token: "",
        }
    }
    return state
}