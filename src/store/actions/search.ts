/*
 * @Author: Flockmaster
 * @Date: 2022-11-04 23:29:43
 * @LastEditTime: 2022-11-05 23:10:51
 * @Language: JavaScript | TypeScript
 */

import { SearchAction } from '@/store/reducers/search';
import { Article } from '@/store/reducers/home';
import { removeLocalHistories, setLocalHistories } from '@/utils/histories';
import request from "@/utils/request";
import { list, RootThunkAction } from "..";

// 给axios返回指定类型
type SuggestListRes = {
    options: string[]
}

type ResultsListRes = {
    page: number
    per_page: number
    results: Article[]
    total_count: number
}

/**
 * 获取关键字搜索提示
 * @param keyword 
 * @returns 
 */
export const getSuggestionList = (keyword: string): RootThunkAction => {
    return async (dispatch) => {
        const res = await request.get<SuggestListRes>('/suggestion?q=' + keyword)
        console.log(res)
        let options = res.data.options
        if (!options) options = []
        dispatch({
            type: 'search/saveSuggestions',
            payload: options
        })
    }
}

/**
 * 清空搜索提示列表
 * @returns 
 */
export const clearSuggestionList = (): SearchAction => {
    return {
        type: 'search/clearSuggestions'
    }
}

/**
 * 保存历史记录
 * @param keyword 
 * @returns 
 */
export const saveHistories = (keyword: string): RootThunkAction => {
    return (dispatch, getState) => {
        let histories = getState().search.histories
        histories = histories.filter(item => item != keyword)
        histories = [keyword, ...histories]
        if (histories.length > 10) {
            histories = histories.slice(0, 10)
        }
        dispatch({
            type: 'search/saveHistories',
            payload: histories
        })
        setLocalHistories(histories)
    }
}

/**
 * 清空历史记录
 * @returns 
 */
export const clearHistory = (): RootThunkAction => {
    return (dispatch) => {
        removeLocalHistories()
        dispatch({
            type: 'search/clearHistories'
        })
    }
}

/**
 * 保存搜索结果
 * @param key 关键字
 * @param page 当前页码
 * @returns 
 */
export const saveResults = (key: string, page: number): RootThunkAction => {
    return async (dispatch) => {
        // const res = await request.get<ResultsListRes>('/search', {
        //     params: {
        //         q: key,
        //         page
        //     }
        // })
        // console.log(res)
        dispatch({
            type: 'search/saveResults',
            // payload: res.data.results
            payload: list
        })
    }
}