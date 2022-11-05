/*
 * @Author: Flockmaster
 * @Date: 2022-11-05 23:34:34
 * @LastEditTime: 2022-11-05 23:52:47
 * @Language: JavaScript | TypeScript
 */
import request from '@/utils/request';
import { RootThunkAction } from '..';

/**
 * 获取文章详情
 * @param id 
 * @returns 
 */
export const getArticleInfo = (id: string): RootThunkAction => {
    return async (dispatch) => {
        const res = await request.get('/articles/' + id)
        dispatch({
            type: 'article/saveDetail',
            payload: res.data
        })
    }
}