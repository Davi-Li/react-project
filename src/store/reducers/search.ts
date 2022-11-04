/*
 * @Author: webcc
 * @Date: 2022-11-04 20:06:27
 * @LastEditTime: 2022-11-04 20:14:56
 * @email: webcc.coder@qq.com
 */

type SearchType = {
    suggestions: string[]
}

export type SearchAction = {
    type: 'search/saveSuggestions',
    payload: string[]
}

const initialValue: SearchType = {
    suggestions: []
}

export default function reducer(state = initialValue, action: SearchAction) {
    if (action.type == 'search/saveSuggestions') {
        return {
            ...state,
            suggestions: action.payload
        }
    }
    return state
}