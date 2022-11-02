/*
 * @Author: webcc
 * @Date: 2022-10-31 19:33:43
 * @LastEditTime: 2022-11-02 15:26:00
 * @email: webcc.coder@qq.com
 */
import { SAVE_ALL_CHANNELS, SAVE_ARTICLE, SAVE_MOREACTION, SAVE_CHANNEL } from "../action_types/home"

let initialState = {
    userChannel: [],
    allChannels: [],
    article: {},
    moreAction: {
        visible: false,
        article_Id: '',
        channelId: ''
    }
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
    if (type == SAVE_MOREACTION) {
        return {
            ...state,
            moreAction: payload
        }
    }
    return state
}