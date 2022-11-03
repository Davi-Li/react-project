/*
 * @Author: webcc
 * @Date: 2022-10-29 14:19:21
 * @LastEditTime: 2022-11-03 17:35:55
 * @email: webcc.coder@qq.com
 */
// 用户 Token 的本地缓存键名
const TOKEN_KEY = 'geek-itcast'

type Token = {
    token: string,
    refresh_token: string
}

/**
 * 从本地缓存中获取 Token 信息
 */
export const getTokenInfo = (): Token => {
    return JSON.parse(localStorage.getItem(TOKEN_KEY) as string) || {}
}

/**
 * 将 Token 信息存入缓存
 * @param {Object} tokenInfo 从后端获取到的 Token 信息
 */
export const setTokenInfo = (tokenInfo: Token): void => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo))
}

/**
 * 删除本地缓存中的 Token 信息
 */
export const removeTokenInfo = (): void => {
    localStorage.removeItem(TOKEN_KEY)
}

/**
 * 判断本地缓存中是否存在 Token 信息
 */
export const hasToken = (): boolean => {
    return !!getTokenInfo().token
}