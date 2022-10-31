/*
 * @Author: webcc
 * @Date: 2022-10-29 11:24:37
 * @LastEditTime: 2022-10-31 17:14:38
 * @email: webcc.coder@qq.com
 */
import request from '@/utils/request'
import { removeTokenInfo, setTokenInfo } from '@/utils/token'
import { LOGOUT, TOKEN } from '../action_types/login'

/**
 * 发送验证码
 * @param {手机号} mobile 
 * @returns 
 */
export const sendCode = (mobile) => {
    return async () => {
        await request({
            url: `/sms/codes/${mobile}`,
            method: 'GET'
        })
        // console.log(res)
        // if (res.status != 429) {
        //     return "ok"
        // } else {
        //     return Promise.reject(new Error(res))
        // }
    }
}

/**
 * 保存token到redux
 * @param {token} payload 
 * @returns 
 */
export const saveToken = (payload) => {
    return {
        type: TOKEN,
        payload
    }
}

/**
 * 登录
 * @param {账号密码} data 
 * @returns 
 */
export const userLogin = (data) => {
    return async dispatch => {
        const res = await request({
            url: '/authorizations',
            data,
            method: 'POST'
        })
        dispatch(saveToken(res.data))
        setTokenInfo(res.data)
    }
}

/**
 * 清除token
 * @returns 
 */
export const removeToken = () => {
    return {
        type: LOGOUT
    }
}

/**
 * 退出登录
 * @returns 
 */
export const logout = () => {
    return dispatch => {
        removeTokenInfo()
        dispatch(removeToken())
    }
}