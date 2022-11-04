/*
 * @Author: webcc
 * @Date: 2022-10-29 21:34:00
 * @LastEditTime: 2022-11-04 13:02:01
 * @email: webcc.coder@qq.com
 */

export type User = {
    id: string,
    name: string,
    photo: string,
    art_count: number,
    follow_count: number,
    fans_count: number,
    like_count: number
}

export type Profile = {
    id: string,
    photo: string,
    name: string,
    mobile: string,
    gender: number,
    birthday: string
}

type InitType = {
    user: User,
    profile: Profile
}

export type ProfileAction = {
    type: 'profile/userinfo'
    payload: User
} | {
    type: 'profile/profile'
    payload: Profile
}

let initialState: InitType = {
    user: {},
    profile: {}
} as InitType

export default function profile(state = initialState, action: ProfileAction) {
    if (action.type == 'profile/userinfo') {
        return {
            ...state,
            user: action.payload
        }
    } else if (action.type == 'profile/profile') {
        return {
            ...state,
            profile: action.payload
        }
    }
    return state
}