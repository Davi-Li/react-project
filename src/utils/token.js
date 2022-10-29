/*
 * @Author: webcc
 * @Date: 2022-10-29 14:19:21
 * @LastEditTime: 2022-10-29 14:20:21
 * @email: webcc.coder@qq.com
 */
// 用户 Token 的本地缓存键名
const TOKEN_KEY = 'geek-itcast'

/**
 * 从本地缓存中获取 Token 信息
 */
export const getTokenInfo = () => {
    return JSON.parse(localStorage.getItem(TOKEN_KEY)) || {}
}

/**
 * 将 Token 信息存入缓存
 * @param {Object} tokenInfo 从后端获取到的 Token 信息
 */
export const setTokenInfo = tokenInfo => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo))
}

/**
 * 删除本地缓存中的 Token 信息
 */
export const removeTokenInfo = () => {
    localStorage.removeItem(TOKEN_KEY)
}

/**
 * 判断本地缓存中是否存在 Token 信息
 */
export const hasToken = () => {
    return !!getTokenInfo().token
}