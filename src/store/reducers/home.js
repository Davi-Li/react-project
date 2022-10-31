/*
 * @Author: webcc
 * @Date: 2022-10-31 19:33:43
 * @LastEditTime: 2022-10-31 22:42:06
 * @email: webcc.coder@qq.com
 */
import { SAVE_ALL_CHANNELS, SAVE_CHANNEL } from "../action_types/home"

let initialState = {
    userChannel: [],
    allChannels: []
}

export default function home(state = initialState, action) {
    const { type, payload } = action
    if (type == SAVE_CHANNEL) {
        return {
            ...state,
            userChannel: payload
        }
    }
    if (type == SAVE_ALL_CHANNELS) {
        return {
            ...state,
            allChannels: payload
        }
    }
    return state
}