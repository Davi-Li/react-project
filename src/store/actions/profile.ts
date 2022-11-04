/*
 * @Author: webcc
 * @Date: 2022-10-29 21:27:09
 * @LastEditTime: 2022-11-04 16:40:12
 * @email: webcc.coder@qq.com
 */
import request from '@/utils/request';
import { RootThunkAction } from '..';
import { User, ProfileAction, Profile } from '../reducers/profile';

type PartialProfile = Partial<Profile>

/**
 * 保存用户个人信息到redux
 * @param {用户信息} payload 
 * @returns 
 */
export const saveUserInfo = (payload: User): ProfileAction => {
    return {
        type: 'profile/userinfo',
        payload
    }
}

/**
 * 获取用户自己信息
 * @returns 
 */
export const getUserInfo = (): RootThunkAction => {
    return async (dispatch) => {
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
export const saveProfile = (payload: Profile): ProfileAction => {
    return {
        type: 'profile/profile',
        payload
    }
}

/**
 * 获取用户个人信息
 * @returns 
 */
export const getProfile = (): RootThunkAction => {
    return async (dispatch) => {
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
export const updateUserProfile = (data: PartialProfile): RootThunkAction => {
    return async (dispatch) => {
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
export const updatePhoto = (data: FormData): RootThunkAction => {
    return async (dispatch) => {
        const res = await request({
            url: '/user/photo',
            method: 'PATCH',
            data
        })
        dispatch(getProfile())
    }
}