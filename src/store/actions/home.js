/*
 * @Author: webcc
 * @Date: 2022-10-31 19:30:35
 * @LastEditTime: 2022-10-31 22:43:04
 * @email: webcc.coder@qq.com
 */
import { getLocalChannels, setLocalChannels } from "@/utils/channels"
import request from "@/utils/request"
import { hasToken } from "@/utils/token"
import { SAVE_ALL_CHANNELS, SAVE_CHANNEL } from "../action_types/home"

/**
 * 将频道列表保存到redux
 * @param {频道列表} payload 
 * @returns 
 */
export const saveChannel = (payload) => {
    return {
        type: SAVE_CHANNEL,
        payload
    }
}

/**
 * 获取频道列表
 * @returns 
 */
export const getUserChannel = () => {
    return async dispatch => {
        // 如果登录
        if (hasToken()) {
            const res = await request({
                url: '/user/channels',
                method: 'GET'
            })
            dispatch(saveChannel(res.data.channels))
        } else {
            const channels = getLocalChannels()
            if (channels) {
                dispatch(saveChannel(channels))
            } else {
                const res = await request({
                    url: '/user/channels',
                    method: 'GET'
                })
                setLocalChannels(res.data.channels)
                dispatch(saveChannel(res.data.channels))
            }
        }
    }
}

export const saveAllChannels = (payload) => {
    return {
        type: SAVE_ALL_CHANNELS,
        payload
    }
}

/**
 * 获取所有频道
 * @returns 
 */
export const getAllChannels = () => {
    return async dispatch => {
        const res = await request({
            url: '/channels',
            method: 'GET'
        })
        dispatch(saveAllChannels(res.data.channels))
    }
}