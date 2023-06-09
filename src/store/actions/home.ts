/*
 * @Author: webcc
 * @Date: 2022-10-31 19:30:35
 * @LastEditTime: 2022-11-05 00:08:04
 * @email: webcc.coder@qq.com
 */
import { getLocalChannels, setLocalChannels } from "@/utils/channels"
import request from "@/utils/request"
import { hasToken } from "@/utils/token"
import { RootThunkAction } from "..";
import { ArticlePayload, Channel, HomeAction, MoreAction } from "../reducers/home"

/**
 * 将频道列表保存到redux
 * @param {频道列表} payload 
 * @returns 
 */
export const saveChannel = (payload: Channel[]): HomeAction => {
    return {
        type: 'home/saveChannel',
        payload
    }
}

/**
 * 获取频道列表
 * @returns 
 */
export const getUserChannel = (): RootThunkAction => {
    return async (dispatch) => {
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
export const saveAllChannels = (payload: Channel[]): HomeAction => {
    return {
        type: 'home/saveAllChannel',
        payload
    }
}

/**
 * 获取所有频道
 * @returns 
 */
export const getAllChannels = (): RootThunkAction => {
    return async (dispatch) => {
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
export const removeChannel = (channel: Channel): RootThunkAction => {
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
export const addChannel = (channel: Channel): RootThunkAction => {
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
export const saveArticle = (payload: ArticlePayload): HomeAction => {
    return {
        type: 'home/saveArticle',
        payload
    }
}

/**
 * 获取文章列表
 * @param {*} channelId 
 * @returns 
 */
export const getArticleList = (channelId: number, timestamp: string, loadMore = false): RootThunkAction => {
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

/**
 * 点击插号时存储文章信息
 * @param {*} payload 
 * @returns 
 */
export const saveMoreAction = (payload: MoreAction): HomeAction => {
    return {
        type: 'home/saveArticleInfo',
        payload
    }
}

/**
 * 对文章不喜欢
 * @param {文章id} articleId 
 * @returns 
 */
export const unLikeArticle = (articleId: string): RootThunkAction => {
    return async (dispatch, getState) => {
        const res = await request({
            url: '/article/dislikes',
            method: 'POST',
            data: {
                target: articleId
            }
        })
        const channelId = getState().home.moreAction.channelId
        const articles = getState().home.article[channelId]
        dispatch(saveArticle({
            channelId,
            timestamp: articles.timestamp,
            list: articles.list.filter(item => item.art_id != articleId),
            loadMore: false
        }))
    }
}

/**
 * 举报文章
 * @param {文章id} articleId 
 * @param {举报理由id} id 
 * @returns 
 */
export const reportArticle = (articleId: string, id: number): RootThunkAction => {
    return async (dispatch, getState) => {
        const res = await request({
            url: '/article/reports',
            method: 'POST',
            data: {
                target: articleId,
                type: id
            }
        })
        const channelId = getState().home.moreAction.channelId
        const articles = getState().home.article[channelId]
        dispatch(saveArticle({
            channelId,
            timestamp: articles.timestamp,
            list: articles.list.filter(item => item.art_id != articleId),
            loadMore: false
        }))
    }
}