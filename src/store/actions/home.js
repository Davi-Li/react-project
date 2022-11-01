/*
 * @Author: webcc
 * @Date: 2022-10-31 19:30:35
 * @LastEditTime: 2022-11-01 21:24:37
 * @email: webcc.coder@qq.com
 */
import { getLocalChannels, setLocalChannels } from "@/utils/channels"
import request from "@/utils/request"
import { hasToken } from "@/utils/token"
import { date } from "yup/lib/locale"
import { SAVE_ALL_CHANNELS, SAVE_ARTICLE, SAVE_CHANNEL } from "../action_types/home"

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

/**
 * 保存全部频道到redux
 * @param {} payload 
 * @returns 
 */
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

/**
 * 删除频道
 * @param {*} channel 
 */
export const removeChannel = (channel) => {
    return async (dispatch, getState) => {
        let result = getState().home.userChannel.filter(item => item.id != channel.id)
        // 如果登录
        if (hasToken()) {
            await request({
                url: `/user/channels/${channel.id}`,
                method: 'DELETE'
            })
            dispatch(saveChannel(result))
        } else {
            // 没有登录，删除本地即可
            dispatch(saveChannel(result))
            setLocalChannels(result)
        }
    }

}

/**
 * 添加频道
 * @param {*} channel 
 * @returns 
 */
export const addChannel = (channel) => {
    return async (dispatch, getState) => {
        let result = [...getState().home.userChannel, channel]
        if (hasToken()) {
            await request({
                url: '/user/channels',
                data: {
                    channels: [channel]
                },
                method: 'PATCH'
            })
            dispatch(saveChannel(result))
        } else {
            dispatch(saveChannel(result))
            setLocalChannels(result)
        }
    }
}

/**
 * 保存文章到redux
 * @param {*} payload 
 * @returns 
 */
export const saveArticle = (payload) => {
    return {
        type: SAVE_ARTICLE,
        payload
    }
}

/**
 * 获取文章列表
 * @param {*} channelId 
 * @returns 
 */
export const getArticleList = (channelId, timestamp, loadMore = false) => {
    return async dispatch => {
        const res = await request({
            url: '/articles',
            method: 'GET',
            params: {
                channel_id: channelId,
                timestamp: timestamp
            }
        })
        dispatch(saveArticle({
            channelId,
            timestamp: res.data.pre_timestamp,
            list: res.data.results,
            loadMore
        }))
    }
}