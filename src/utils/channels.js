/*
 * @Author: webcc
 * @Date: 2022-10-31 19:54:51
 * @LastEditTime: 2022-10-31 20:08:50
 * @email: webcc.coder@qq.com
 */
const CHANNEL_KEY = 'geek-itcast-channels'

/**
 * 获取本地频道
 * @returns 
 */
export const getLocalChannels = () => {
    return JSON.parse(localStorage.getItem(CHANNEL_KEY))
}

/**
 * 设置本地频道
 * @param {*} channels 
 */
export const setLocalChannels = (channels) => {
    localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))
}

/**
 * 移除本地频道
 */
export const removeLocalChannels = () => {
    localStorage.removeItem(CHANNEL_KEY)
}

/**
 * 判断是否有本地频道
 * @returns 
 */
export const hasLocalChannels = () => {
    return !!getLocalChannels()
}
