import { TOKEN } from "../action_types/login"

/*
 * @Author: webcc
 * @Date: 2022-10-29 14:06:35
 * @LastEditTime: 2022-10-29 22:04:37
 * @email: webcc.coder@qq.com
 */
let initialValus = {
    refresh_token: "",
    token: ""
}
export default function login(state = initialValus, action) {
    let { type, payload } = action
    if (type == TOKEN) {
        return payload
    }
    return state
}