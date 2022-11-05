/*
 * @Author: webcc
 * @Date: 2022-11-04 20:06:27
 * @LastEditTime: 2022-11-05 23:06:52
 * @email: webcc.coder@qq.com
 */

import { Article } from "./home"

type SearchType = {
    suggestions: string[]
    histories: string[]
    results: Article[]
}

export type SearchAction = {
    type: 'search/saveSuggestions',
    payload: string[]
} | {
    type: 'search/clearSuggestions'
} | {
    type: 'search/saveHistories',
    payload: string[]
} | {
    type: 'search/clearHistories'
} | {
    type: 'search/saveResults'
    payload: Article[]
}

const initialValue: SearchType = {
    suggestions: ['aaa', 'vvv', 'javescript', 'java'],
    histories: [],
    results: []
}

export default function reducer(state = initialValue, action: SearchAction): SearchType {
    if (action.type == 'search/saveSuggestions') {
        return {
            ...state,
            suggestions: action.payload
        }
    }
    if (action.type == 'search/clearSuggestions') {
        return {
            ...state,
            suggestions: []
        }
    }
    if (action.type == 'search/saveHistories') {
        return {
            ...state,
            histories: action.payload
        }
    }
    if (action.type == 'search/clearHistories') {
        return {
            ...state,
            histories: []
        }
    }
    if (action.type == 'search/saveResults') {
        return {
            ...state,
            results: [...state.results, ...action.payload]
        }
    }
    return state
}