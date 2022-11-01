/*
 * @Author: webcc
 * @Date: 2022-10-31 19:33:43
 * @LastEditTime: 2022-11-01 21:32:01
 * @email: webcc.coder@qq.com
 */
import { SAVE_ALL_CHANNELS, SAVE_ARTICLE, SAVE_CHANNEL } from "../action_types/home"

let initialState = {
    userChannel: [],
    allChannels: [],
    article: {}
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
    if (type == SAVE_ARTICLE) {
        const { list, timestamp, channelId, loadMore } = payload
        return {
            ...state,
            article: {
                ...state.article,
                [channelId]: {
                    timestamp: timestamp,
                    list: loadMore ? [...state.article[channelId].list, ...list] : list
                }
            }
        }
    }
    return state
}