import { SAVE_PROFILE, SAVE_USER } from "../action_types/profile"

let initialState = {
    user: {},
    profile: {}
}

export default function profile(state = initialState, action) {
    let { type, payload } = action
    if (type == SAVE_USER) {
        return {
            ...state,
            user: payload
        }
    } else if (type == SAVE_PROFILE) {
        return {
            ...state,
            profile: payload
        }
    }
    return state
}