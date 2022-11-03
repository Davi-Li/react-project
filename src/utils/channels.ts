/*
 * @Author: webcc
 * @Date: 2022-10-31 19:54:51
 * @LastEditTime: 2022-11-03 17:25:08
 * @email: webcc.coder@qq.com
 */
const CHANNEL_KEY = 'geek-itcast-channels'

type Channel = {
    id: number,
    name: string
}[]

/**
 * 获取本地频道
 * @returns 
 */
export const getLocalChannels = (): Channel => {
    return JSON.parse(localStorage.getItem(CHANNEL_KEY)!)
}

/**
 * 设置本地频道
 * @param {*} channels 
 */
export const setLocalChannels = (channels: Channel) => {
    localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))
}

/**
 * 移除本地频道
 */
export const removeLocalChannels = (): void => {
    localStorage.removeItem(CHANNEL_KEY)
}

/**
 * 判断是否有本地频道
 * @returns 
 */
export const hasLocalChannels = (): boolean => {
    return !!getLocalChannels()
}
