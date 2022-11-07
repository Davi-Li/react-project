/*
 * @Author: Flockmaster
 * @Date: 2022-11-05 23:34:34
 * @LastEditTime: 2022-11-07 10:27:11
 * @Language: JavaScript | TypeScript
 */
import request from '@/utils/request';
import { RootThunkAction } from '..';
import { ArticleAction, Comment } from '../reducers/article';

type CommentRes = {
    end_id: string
    last_id: string
    total_count: number
    results: Comment[]
}

type addCommentRes = {
    target: string
    new_obj: Comment
    com_id: string
}

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

/**
 * 获取文章评论
 * @param id 
 * @returns 
 */
export const getCommentList = (id: string): RootThunkAction => {
    return async (dispatch) => {
        const res = await request.get<CommentRes>('/comments', {
            params: {
                type: 'a',
                source: id
            }
        })
        dispatch({
            type: 'article/saveComment',
            payload: res.data
        })
    }
}

/**
 * 获取更多评论
 * @param id 
 * @param offset 上一页的 last_id 
 * @returns 
 */
export const getMoreCommentList = (id: string, offset: string): RootThunkAction => {
    return async (dispatch) => {
        const res = await request.get<CommentRes>('/comments', {
            params: {
                type: 'a',
                source: id,
                offset
            }
        })
        dispatch({
            type: 'article/saveMoreComment',
            payload: res.data
        })
    }
}

/**
 * 对文章点赞或取消点赞
 * @param id 
 * @param attitude 
 * @returns 
 */
export const likeArticle = (id: string, attitude: number): RootThunkAction => {
    return async (dispatch) => {
        if (attitude == 1) {
            await request.delete(`/article/likings/${id}`)
        } else {
            await request.post('/article/likings', {
                target: id
            })
        }
        // 更新
        dispatch(getArticleInfo(id))
    }
}

/**
 * 收藏文章或取消收藏文章
 * @param id 
 * @param is_collected 
 * @returns 
 */
export const collectArticle = (id: string, is_collected: boolean): RootThunkAction => {
    return async (dispatch) => {
        if (is_collected) {
            await request.delete(`/article/collections/${id}`)
        } else {
            await request.post('/article/collections', {
                target: id
            })
        }
        dispatch(getArticleInfo(id))
    }
}

/**
 * 关注作者或取关作者
 * @param aut_id 作者id
 * @param is_followed 
 * @param art_id 文章id
 * @returns 
 */
export const followAuth = (aut_id: string, is_followed: boolean, art_id: string): RootThunkAction => {
    return async (dispatch) => {
        if (is_followed) {
            await request.delete(`/user/followings/${aut_id}`)
        } else {
            await request.post('/user/followings', {
                target: aut_id
            })
        }
        dispatch(getArticleInfo(art_id))
    }
}

/**
 * 添加文章评论
 * @param id 
 * @param value 
 * @returns 
 */
export const addComment = (id: string, value: string): RootThunkAction => {
    return async (dispatch, getState) => {
        const res = await request.post<addCommentRes>('/comments', {
            target: id,
            content: value
        })
        console.log(res)
        dispatch({
            type: 'article/saveNewComment',
            payload: res.data.new_obj
        })
        dispatch(getArticleInfo(getState().article.detail.art_id))
    }
}

/**
 * 更新评论内容
 */
export const updateComment = (comment: Comment): ArticleAction => {
    return {
        type: 'article/updateComment',
        payload: comment
    }
}

/**
 * 对评论点赞
 * @param com_id 评论id
 * @returns 
 */
export const likeComment = (type: string, com_id: string, is_liking: boolean): RootThunkAction => {
    return async (dispatch, getState) => {
        if (is_liking) {
            await request.delete(`/comment/likings/${com_id}`)
        } else {
            await request.post('/comment/likings', {
                target: com_id
            })
        }
        if (type == 'normal') {
            dispatch(getCommentList(getState().article.detail.art_id))
        }
    }
}