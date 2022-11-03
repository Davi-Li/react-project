/*
 * @Author: webcc
 * @Date: 2022-10-29 11:24:37
 * @LastEditTime: 2022-11-04 00:08:36
 * @email: webcc.coder@qq.com
 */
import request from '@/utils/request'
import { removeTokenInfo, setTokenInfo } from '@/utils/token'
import { Dispatch } from 'redux'
import { LOGOUT, TOKEN } from '../action_types/login'

/**
 * 发送验证码
 * @param {手机号} mobile 
 * @returns 
 */
export const sendCode = (mobile: string) => {
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

type Token = {
    token: string,
    refresh_token: string
}

/**
 * 保存token到redux
 * @param {token} payload 
 * @returns 
 */
export const saveToken = (payload: Token) => {
    return {
        type: TOKEN,
        payload
    }
}

type Login = {
    mobile: string,
    code: string
}

/**
 * 登录
 * @param {账号密码} data 
 * @returns 
 */
export const userLogin = (data: Login) => {
    return async (dispatch: Dispatch) => {
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
    return (dispatch: Dispatch) => {
        removeTokenInfo()
        dispatch(removeToken())
    }
}