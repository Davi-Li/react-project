/*
 * @Author: webcc
 * @Date: 2022-10-29 21:27:09
 * @LastEditTime: 2022-10-30 17:16:40
 * @email: webcc.coder@qq.com
 */
import request from '@/utils/request';
import { SAVE_PROFILE, SAVE_USER } from '../action_types/profile';

/**
 * 保存用户个人信息到redux
 * @param {用户信息} payload 
 * @returns 
 */
export const saveUserInfo = (payload) => {
    return {
        type: SAVE_USER,
        payload
    }
}

/**
 * 获取用户自己信息
 * @returns 
 */
export const getUserInfo = () => {
    return async dispatch => {
        const res = await request({
            url: '/user',
            method: 'GET',
        })
        dispatch(saveUserInfo(res.data))
    }
}

/**
 * 保存用户个人信息到redux
 * @param {用户信息} payload 
 * @returns 
 */
export const saveProfile = (payload) => {
    return {
        type: SAVE_PROFILE,
        payload
    }
}

/**
 * 获取用户个人信息
 * @returns 
 */
export const getProfile = () => {
    return async dispatch => {
        const res = await request({
            url: '/user/profile',
            method: 'GET',
        })
        dispatch(saveProfile(res.data))
    }
}

/**
 * 修改用户个人信息
 * @param {*} data 
 * @returns 
 */
export const updateUserProfile = (data) => {
    return async dispatch => {
        const res = await request({
            url: '/user/profile',
            method: 'PATCH',
            data
        })
        dispatch(getProfile())
    }
}

/**
 * 上传头像
 * @param {FormData} data 
 * @returns 
 */
export const updatePhoto = (data) => {
    return async dispatch => {
        const res = await request({
            url: '/user/photo',
            method: 'PATCH',
            data
        })
        dispatch(getProfile())
    }
}